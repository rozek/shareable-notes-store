/*******************************************************************************
*                                                                              *
*                    SDS_DataStore — Delete & Purge Tests                      *
*                                                                              *
*******************************************************************************/

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SDS_DataStore } from '../store/SDS_DataStore.js'
import { SDS_Error }     from '@rozek/sds-core'

//----------------------------------------------------------------------------//
//                                   Tests                                    //
//----------------------------------------------------------------------------//

describe('SDS_DataStore — Delete & Purge', () => {
  it('D-01: deleteEntry moves data to TrashItem', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    Store.deleteEntry(Item)
    expect(Item.outerItem?.Id).toBe(Store.TrashItem.Id)
  })

  it('D-02: deleted data\'s children are also in trash hierarchy', () => {
    const Store  = SDS_DataStore.fromScratch()
    const OuterItem = Store.newItemAt(undefined, Store.RootItem)
    const InnerItem = Store.newItemAt(undefined, OuterItem)
    Store.deleteEntry(OuterItem)
    // outerItem should be directly in Trash
    expect(OuterItem.outerItem?.Id).toBe(Store.TrashItem.Id)
    // innerItem should still be inside OuterItem (deleteEntry only moves the top)
    expect(InnerItem.outerItem?.Id).toBe(OuterItem.Id)
  })

  it('D-03: deleteEntry fires ChangeSet with outerItem and innerEntryList', () => {
    const Store   = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    const Handler = vi.fn()
    Store.onChangeInvoke(Handler)
    Store.deleteEntry(Item)
    const ChangeSet = Handler.mock.calls[0][1]
    expect(ChangeSet[Item.Id]?.has('outerItem')).toBe(true)
    expect(ChangeSet[Store.TrashItem.Id]?.has('innerEntryList')).toBe(true)
  })

  it('D-04: deleteEntry(RootItem) throws delete-not-permitted', () => {
    const Store = SDS_DataStore.fromScratch()
    expect(() => Store.deleteEntry(Store.RootItem)).toThrowError(
      expect.objectContaining({ code:'delete-not-permitted' })
    )
  })

  it('D-05: deleteEntry(TrashItem) throws', () => {
    const Store = SDS_DataStore.fromScratch()
    expect(() => Store.deleteEntry(Store.TrashItem)).toThrowError(
      expect.objectContaining({ code:'delete-not-permitted' })
    )
  })

  it('D-06: deleteEntry(LostAndFoundItem) throws', () => {
    const Store = SDS_DataStore.fromScratch()
    expect(() => Store.deleteEntry(Store.LostAndFoundItem)).toThrowError(
      expect.objectContaining({ code:'delete-not-permitted' })
    )
  })

  it('D-07: purgeEntry on data not in TrashItem throws purge-not-in-trash', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    expect(() => Store.purgeEntry(Item)).toThrowError(
      expect.objectContaining({ code:'purge-not-in-trash' })
    )
  })

  it('D-08: purgeEntry removes data from store', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    Store.deleteEntry(Item)
    Store.purgeEntry(Item)
    expect(Store.EntryWithId(Item.Id)).toBeUndefined()
  })

  it('D-09: purgeEntry throws purge-protected when data has incoming link from RootItem tree', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    Store.newLinkAt(Item, Store.RootItem)   // link in root tree points to Data
    Store.deleteEntry(Item)                  // data is in Trash
    expect(() => Store.purgeEntry(Item)).toThrowError(
      expect.objectContaining({ code:'purge-protected' })
    )
    expect(Store.EntryWithId(Item.Id)).toBeDefined()  // still exists
  })

  it('D-12: data.delete() equivalent to store.deleteEntry(data)', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    Item.delete()
    expect(Item.outerItem?.Id).toBe(Store.TrashItem.Id)
  })

  it('D-13: data.purge() throws if data not in Trash', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    expect(() => Item.purge()).toThrowError(
      expect.objectContaining({ code:'purge-not-in-trash' })
    )
  })

  // ---------------------------------------------------------------------------
  // d-14 … d-21: Trash TTL / auto-purge
  // ---------------------------------------------------------------------------

  it('D-14: deleteEntry records _trashedAt in Info with a timestamp ≥ the time before the call', () => {
    const Store  = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    const Before = Date.now()
    Store.deleteEntry(Item)
    const TrashedAt = Item.Info['_trashedAt'] as number
    expect(typeof TrashedAt).toBe('number')
    expect(TrashedAt).toBeGreaterThanOrEqual(Before)
  })

  it('D-15: purgeExpiredTrashEntries purges entries whose _trashedAt exceeds the TTL', () => {
    vi.useFakeTimers()
    try {
      const Store = SDS_DataStore.fromScratch()
      const Item = Store.newItemAt(undefined, Store.RootItem)
      vi.setSystemTime(new Date(Date.now() - 90_000))  // 90 s in the past
      Store.deleteEntry(Item)
      vi.setSystemTime(new Date(Date.now() + 90_000))  // restore to now

      const Count = Store.purgeExpiredTrashEntries(60_000)  // TTL = 60 s
      expect(Count).toBe(1)
      expect(Store.EntryWithId(Item.Id)).toBeUndefined()
    } finally {
      vi.useRealTimers()
    }
  })

  it('D-16: purgeExpiredTrashEntries skips entries whose _trashedAt is within the TTL', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    Store.deleteEntry(Item)  // _trashedAt ≈ now

    const Count = Store.purgeExpiredTrashEntries(86_400_000)  // TTL = 1 day
    expect(Count).toBe(0)
    expect(Store.EntryWithId(Item.Id)).toBeDefined()
  })

  it('D-17: purgeExpiredTrashEntries skips entries without _trashedAt', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    // move to Trash without going through deleteEntry (bypasses _trashedAt recording)
    Store.moveEntryTo(Item, Store.TrashItem)

    const Count = Store.purgeExpiredTrashEntries(0)  // TTL = 0 ms (everything expired)
    expect(Count).toBe(0)
    expect(Store.EntryWithId(Item.Id)).toBeDefined()
  })

  it('D-18: purgeExpiredTrashEntries silently skips protected entries', () => {
    vi.useFakeTimers()
    try {
      const Store = SDS_DataStore.fromScratch()
      const Item = Store.newItemAt(undefined, Store.RootItem)
      Store.newLinkAt(Item, Store.RootItem)  // link in root tree → Data is protected

      vi.setSystemTime(new Date(Date.now() - 90_000))
      Store.deleteEntry(Item)
      vi.setSystemTime(new Date(Date.now() + 90_000))

      expect(() => Store.purgeExpiredTrashEntries(60_000)).not.toThrow()
      const Count = Store.purgeExpiredTrashEntries(60_000)
      expect(Count).toBe(0)
      expect(Store.EntryWithId(Item.Id)).toBeDefined()
    } finally {
      vi.useRealTimers()
    }
  })

  it('D-19: purgeExpiredTrashEntries returns the count of purged entries', () => {
    vi.useFakeTimers()
    try {
      const Store = SDS_DataStore.fromScratch()
      const ItemA = Store.newItemAt(undefined, Store.RootItem)
      const ItemB = Store.newItemAt(undefined, Store.RootItem)
      vi.setSystemTime(new Date(Date.now() - 90_000))
      Store.deleteEntry(ItemA)
      Store.deleteEntry(ItemB)
      vi.setSystemTime(new Date(Date.now() + 90_000))

      const Count = Store.purgeExpiredTrashEntries(60_000)
      expect(Count).toBe(2)
    } finally {
      vi.useRealTimers()
    }
  })

  it('D-20: dispose() stops the auto-purge timer', () => {
    vi.useFakeTimers()
    const purgeSpy = vi.fn()
    try {
      const Store = SDS_DataStore.fromScratch({ TrashTTLms:1_000, TrashCheckIntervalMs:500 })
      // monkey-patch to count calls from the timer
      const orig = Store.purgeExpiredTrashEntries.bind(Store)
      ;(Store as any).purgeExpiredTrashEntries = (...args: any[]) => {
        purgeSpy()
        return orig(...args)
      }

      vi.advanceTimersByTime(600)   // first interval fires → spy called once
      expect(purgeSpy).toHaveBeenCalledTimes(1)

      Store.dispose()               // stop the timer

      vi.advanceTimersByTime(2_000) // no more intervals should fire
      expect(purgeSpy).toHaveBeenCalledTimes(1)  // still 1, no additional calls
    } finally {
      vi.useRealTimers()
    }
  })

  it('D-21: auto-purge timer calls purgeExpiredTrashEntries when TrashTTLms is configured', () => {
    vi.useFakeTimers()
    try {
      const Store = SDS_DataStore.fromScratch({ TrashTTLms:60_000, TrashCheckIntervalMs:500 })
      const Item = Store.newItemAt(undefined, Store.RootItem)

      // simulate data deleted in the past
      vi.setSystemTime(new Date(Date.now() - 90_000))
      Store.deleteEntry(Item)
      vi.setSystemTime(new Date(Date.now() + 90_000))

      // Advance past one check interval — auto-purge should have fired
      vi.advanceTimersByTime(600)
      expect(Store.EntryWithId(Item.Id)).toBeUndefined()
      Store.dispose()
    } finally {
      vi.useRealTimers()
    }
  })

  // ---------------------------------------------------------------------------
  // d-23 … d-24: purge persistence round-trip (simulates the SyncEngine cycle)
  // ---------------------------------------------------------------------------

  it('D-23: purgeEntry survives a snapshot+patch-replay round-trip', () => {
    // session 1 — create entries, trash them, purge all
    const Store1 = SDS_DataStore.fromScratch()
    const ItemA = Store1.newItemAt(undefined, Store1.RootItem)
      ItemA.Label = 'alpha'
    const ItemB = Store1.newItemAt(undefined, Store1.RootItem)
      ItemB.Label = 'bravo'
    const ItemC = Store1.newItemAt(undefined, Store1.RootItem)
      ItemC.Label = 'charlie'

    Store1.deleteEntry(ItemA)
    Store1.deleteEntry(ItemB)
    Store1.deleteEntry(ItemC)
    expect(Store1._innerEntriesOf(Store1.TrashItem.Id).length).toBe(3)

    // collect ALL patches produced so far (like persistence appendPatch does)
    const PatchesBeforePurge = Store1.exportPatch()

    // now purge all
    for (const Entry of [ ...Store1._innerEntriesOf(Store1.TrashItem.Id) ]) {
      Entry.purge()
    }
    expect(Store1._innerEntriesOf(Store1.TrashItem.Id).length).toBe(0)

    // collect the full patch log including purge
    const AllPatches = Store1.exportPatch()

    // snapshot after purge (this is what #writeCheckpoint saves)
    const Snapshot = Store1.asBinary()

    // session 2 — reload from snapshot, replay ALL patches (offline engine
    // does not prune patches, so loadPatchesSince(0) returns everything)
    const Store2 = SDS_DataStore.fromBinary(Snapshot)
    // before replay: trash should be empty (snapshot is post-purge)
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)

    // replay ALL patches (creation + trash + purge) — must remain empty
    Store2.applyRemotePatch(AllPatches)
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)
    expect(Store2.EntryWithId(ItemA.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemB.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemC.Id)).toBeUndefined()

    // also verify root only contains system containers
    const RootEntries = Store2._innerEntriesOf(Store2.RootItem.Id)
    expect(RootEntries.length).toBe(2)
  })

  it('D-24: purgeEntry survives replay of only pre-purge patches on post-purge snapshot', () => {
    // this simulates the worst case: purge patches weren't persisted
    // (appendPatch was fire-and-forget and didn't complete before stop),
    // but the snapshot WAS persisted
    const Store1 = SDS_DataStore.fromScratch()
    const ItemA = Store1.newItemAt(undefined, Store1.RootItem)
      ItemA.Label = 'alpha'
    const ItemB = Store1.newItemAt(undefined, Store1.RootItem)
      ItemB.Label = 'bravo'

    Store1.deleteEntry(ItemA)
    Store1.deleteEntry(ItemB)

    // collect patches BEFORE purge (creation + trash moves)
    const PatchesBeforePurge = Store1.exportPatch()

    // purge
    for (const Entry of [ ...Store1._innerEntriesOf(Store1.TrashItem.Id) ]) {
      Entry.purge()
    }
    expect(Store1._innerEntriesOf(Store1.TrashItem.Id).length).toBe(0)

    // snapshot after purge
    const Snapshot = Store1.asBinary()

    // reload from post-purge snapshot, but only replay PRE-purge patches
    // (purge patches were lost because appendPatch didn't complete)
    const Store2 = SDS_DataStore.fromBinary(Snapshot)
    Store2.applyRemotePatch(PatchesBeforePurge)

    // trash MUST still be empty — old creation patches must not resurrect entries
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)
    expect(Store2.EntryWithId(ItemA.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemB.Id)).toBeUndefined()
  })

  it('D-25: purge survives per-patch replay (simulates individual appendPatch round-trip)', () => {
    // collect patches one by one as the SyncEngine would
    const Patches:Uint8Array[] = []
    const Store1 = SDS_DataStore.fromScratch()
    let Cursor = Store1.currentCursor

    // create 3 items
    const ItemA = Store1.newItemAt(undefined, Store1.RootItem)
      ItemA.Label = 'alpha'
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    const ItemB = Store1.newItemAt(undefined, Store1.RootItem)
      ItemB.Label = 'bravo'
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    const ItemC = Store1.newItemAt(undefined, Store1.RootItem)
      ItemC.Label = 'charlie'
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    // trash all 3
    Store1.deleteEntry(ItemA)
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemB)
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemC)
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    // purge all
    for (const Entry of [ ...Store1._innerEntriesOf(Store1.TrashItem.Id) ]) {
      Entry.purge()
      Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor
    }

    // snapshot after purge
    const Snapshot = Store1.asBinary()

    // session 2: reload from snapshot, replay patches ONE BY ONE
    // (each applyRemotePatch also calls recoverOrphans internally)
    const Store2 = SDS_DataStore.fromBinary(Snapshot)
    for (const PatchBytes of Patches) {
      Store2.applyRemotePatch(PatchBytes)
    }

    // trash must be empty, entries must not exist, LostAndFound must be empty
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)
    expect(Store2._innerEntriesOf(Store2.LostAndFoundItem.Id).length).toBe(0)
    expect(Store2.EntryWithId(ItemA.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemB.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemC.Id)).toBeUndefined()
  })

  it('D-26: purge survives per-patch replay of ONLY pre-purge patches on post-purge snapshot', () => {
    // worst case: purge patches lost, only creation+trash patches in SQLite
    const PrePurgePatches:Uint8Array[] = []
    const Store1 = SDS_DataStore.fromScratch()
    let Cursor = Store1.currentCursor

    const ItemA = Store1.newItemAt(undefined, Store1.RootItem)
      ItemA.Label = 'alpha'
    PrePurgePatches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    const ItemB = Store1.newItemAt(undefined, Store1.RootItem)
      ItemB.Label = 'bravo'
    PrePurgePatches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemA)
    PrePurgePatches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemB)
    PrePurgePatches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    // purge (patches NOT saved)
    for (const Entry of [ ...Store1._innerEntriesOf(Store1.TrashItem.Id) ]) {
      Entry.purge()
    }

    const Snapshot = Store1.asBinary()

    // reload: post-purge snapshot + pre-purge patches only
    const Store2 = SDS_DataStore.fromBinary(Snapshot)
    for (const PatchBytes of PrePurgePatches) {
      Store2.applyRemotePatch(PatchBytes)
    }

    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)
    expect(Store2._innerEntriesOf(Store2.LostAndFoundItem.Id).length).toBe(0)
    expect(Store2.EntryWithId(ItemA.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemB.Id)).toBeUndefined()
  })

  it('D-27: purge patches applied to a stale (pre-purge) snapshot delete entries', () => {
    // this simulates the concurrent-access scenario:
    //  - process A (CLI) purges entries and saves patches
    //  - process B (sidecar) overwrites the snapshot with its stale pre-purge state
    //  - next load uses stale snapshot + all patches (including purge patches)
    const Patches:Uint8Array[] = []
    const Store1 = SDS_DataStore.fromScratch()
    let Cursor = Store1.currentCursor

    // create 3 items and trash them
    const ItemA = Store1.newItemAt(undefined, Store1.RootItem)
      ItemA.Label = 'alpha'
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    const ItemB = Store1.newItemAt(undefined, Store1.RootItem)
      ItemB.Label = 'bravo'
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    const ItemC = Store1.newItemAt(undefined, Store1.RootItem)
      ItemC.Label = 'charlie'
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemA)
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemB)
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemC)
    Patches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor

    // take PRE-purge snapshot (simulates what the sidecar holds in memory)
    const StaleSnapshot = Store1.asBinary()

    // purge all entries — collect purge patches
    const PurgePatches:Uint8Array[] = []
    for (const Entry of [ ...Store1._innerEntriesOf(Store1.TrashItem.Id) ]) {
      Entry.purge()
      const P = Store1.exportPatch(Cursor); Cursor = Store1.currentCursor
      Patches.push(P)
      PurgePatches.push(P)
    }
    expect(Store1._innerEntriesOf(Store1.TrashItem.Id).length).toBe(0)

    // simulate: load from STALE snapshot, replay ALL patches (including purge)
    const Store2 = SDS_DataStore.fromBinary(StaleSnapshot)
    // before replay: entries are still in trash (snapshot is pre-purge)
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(3)

    for (const PatchBytes of Patches) {
      Store2.applyRemotePatch(PatchBytes)
    }

    // after replay: purge patches must have deleted the entries
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)
    expect(Store2._innerEntriesOf(Store2.LostAndFoundItem.Id).length).toBe(0)
    expect(Store2.EntryWithId(ItemA.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemB.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemC.Id)).toBeUndefined()
  })

  it('D-28: purge patches applied to stale snapshot — purge patches ONLY (no pre-purge patches)', () => {
    // simulates the scenario where the sidecar has pruned the old patches
    // but the CLI's purge patches survived
    const Store1 = SDS_DataStore.fromScratch()
    let Cursor = Store1.currentCursor

    const ItemA = Store1.newItemAt(undefined, Store1.RootItem)
      ItemA.Label = 'alpha'
    Cursor = Store1.currentCursor

    const ItemB = Store1.newItemAt(undefined, Store1.RootItem)
      ItemB.Label = 'bravo'
    Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemA)
    Cursor = Store1.currentCursor

    Store1.deleteEntry(ItemB)
    Cursor = Store1.currentCursor

    // take PRE-purge snapshot
    const StaleSnapshot = Store1.asBinary()

    // purge all entries — collect ONLY the purge patches
    const PurgePatches:Uint8Array[] = []
    for (const Entry of [ ...Store1._innerEntriesOf(Store1.TrashItem.Id) ]) {
      Entry.purge()
      PurgePatches.push(Store1.exportPatch(Cursor)); Cursor = Store1.currentCursor
    }

    // load from stale snapshot, replay ONLY purge patches
    const Store2 = SDS_DataStore.fromBinary(StaleSnapshot)
    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(2)

    for (const PatchBytes of PurgePatches) {
      Store2.applyRemotePatch(PatchBytes)
    }

    expect(Store2._innerEntriesOf(Store2.TrashItem.Id).length).toBe(0)
    expect(Store2._innerEntriesOf(Store2.LostAndFoundItem.Id).length).toBe(0)
    expect(Store2.EntryWithId(ItemA.Id)).toBeUndefined()
    expect(Store2.EntryWithId(ItemB.Id)).toBeUndefined()
  })

  it('D-22: moving an entry out of TrashItem removes Info._trashedAt', () => {
    const Store = SDS_DataStore.fromScratch()
    const Item = Store.newItemAt(undefined, Store.RootItem)
    Store.deleteEntry(Item)
    expect(typeof Item.Info['_trashedAt']).toBe('number')  // set by deleteEntry
    Store.moveEntryTo(Item, Store.RootItem)                // move back out of trash
    expect(Item.Info['_trashedAt']).toBeUndefined()        // cleaned up
  })

})
