import { ChangeHandler } from '@rozek/sds-core';
import { ChangeOrigin } from '@rozek/sds-core';
import { SDS_ChangeSet } from '@rozek/sds-core';
import { SDS_ConnectionOptions } from '@rozek/sds-core';
import { SDS_ConnectionState } from '@rozek/sds-core';
import { SDS_DataStore as SDS_DataStore_2 } from '@rozek/sds-core';
import { SDS_DataStoreOptions } from '@rozek/sds-core';
import { SDS_Entry } from '@rozek/sds-core';
import { SDS_EntryChangeSet } from '@rozek/sds-core';
import { SDS_Error } from '@rozek/sds-core';
import { SDS_Item } from '@rozek/sds-core';
import { SDS_Link } from '@rozek/sds-core';
import { SDS_LocalPresenceState } from '@rozek/sds-core';
import { SDS_NetworkProvider } from '@rozek/sds-core';
import { SDS_PatchSeqNumber } from '@rozek/sds-core';
import { SDS_PersistenceProvider } from '@rozek/sds-core';
import { SDS_PresenceProvider } from '@rozek/sds-core';
import { SDS_RemotePresenceState } from '@rozek/sds-core';
import { SDS_SyncCursor } from '@rozek/sds-core';

export { ChangeHandler }

export { ChangeOrigin }

export { SDS_ChangeSet }

export { SDS_ConnectionOptions }

export { SDS_ConnectionState }

export declare class SDS_DataStore extends SDS_DataStore_2 {
    #private;
    /**** constructor — initialise store from document and options ****/
    private constructor();
    /**** fromScratch — build initial document with three well-known items ****/
    static fromScratch(Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromBinary — restore store from compressed update ****/
    static fromBinary(Data: Uint8Array, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromJSON — restore store from a plain JSON object or its JSON.stringify representation ****/
    static fromJSON(Serialisation: unknown, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** RootItem / TrashItem / LostAndFoundItem — access system items ****/
    get RootItem(): SDS_Item;
    get TrashItem(): SDS_Item;
    get LostAndFoundItem(): SDS_Item;
    /**** EntryWithId — retrieve entry by Id ****/
    EntryWithId(EntryId: string): SDS_Entry | undefined;
    /**** newItemAt — create a new item of given type as inner entry of outerItem ****/
    newItemAt(MIMEType: string | undefined, outerItem: SDS_Item, InsertionIndex?: number): SDS_Item;
    /**** newLinkAt — create link as inner link of outer data ****/
    newLinkAt(Target: SDS_Item, outerItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** deserializeItemInto — import item subtree; always remaps all IDs ****/
    deserializeItemInto(Serialisation: unknown, outerItem: SDS_Item, InsertionIndex?: number): SDS_Item;
    /**** deserializeLinkInto — import link; always assigns a new Id ****/
    deserializeLinkInto(Serialisation: unknown, outerItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** moveEntryTo — move entry to new outer data and position ****/
    moveEntryTo(Entry: SDS_Entry, outerItem: SDS_Item, InsertionIndex?: number): void;
    /**** _rebalanceInnerEntriesOf — backend-specific raw rebalance; caller must hold a transaction ****/
    _rebalanceInnerEntriesOf(outerItemId: string): void;
    /**** deleteEntry — move entry to trash with timestamp ****/
    deleteEntry(Entry: SDS_Entry): void;
    /**** purgeEntry — permanently delete entry and subtree ****/
    purgeEntry(Entry: SDS_Entry): void;
    /**** purgeExpiredTrashEntries — remove trash items past TTL ****/
    purgeExpiredTrashEntries(TTLms?: number): number;
    /**** dispose — cleanup trash timer ****/
    dispose(): void;
    /**** transact — execute callback in batched transaction ****/
    transact(Callback: () => void): void;
    /**** onChangeInvoke — subscribe to change events ****/
    onChangeInvoke(Handler: ChangeHandler): () => void;
    /**** applyRemotePatch — apply remote changes and update indices ****/
    applyRemotePatch(encodedPatch: Uint8Array): void;
    /**** currentCursor — get state vector for sync ****/
    get currentCursor(): SDS_SyncCursor;
    /**** exportPatch — encode changes since cursor ****/
    exportPatch(sinceCursor?: SDS_SyncCursor): Uint8Array;
    /**** recoverOrphans — move entries with missing parents to lost-and-found ****/
    recoverOrphans(): void;
    /**** asBinary — export compressed Y.js update ****/
    asBinary(): Uint8Array;
    /**** newEntryFromBinaryAt — import a gzip-compressed entry (item or link) ****/
    newEntryFromBinaryAt(Serialisation: Uint8Array, outerItem: SDS_Item, InsertionIndex?: number): SDS_Entry;
    /**** _EntryAsBinary — gzip-compress the JSON representation of an entry ****/
    _EntryAsBinary(Id: string): Uint8Array;
    /**** _KindOf — get entry kind ****/
    _KindOf(Id: string): 'item' | 'link';
    /**** _LabelOf — get entry label text ****/
    _LabelOf(Id: string): string;
    /**** _setLabelOf — set entry label text ****/
    _setLabelOf(Id: string, Value: string): void;
    /**** _TypeOf — get data MIME type ****/
    _TypeOf(Id: string): string;
    /**** _setTypeOf — set data MIME type ****/
    _setTypeOf(Id: string, Value: string): void;
    /**** _ValueKindOf — get data value kind ****/
    _ValueKindOf(Id: string): 'none' | 'literal' | 'binary' | 'binary-reference' | 'literal-reference' | 'pending';
    /**** _readValueOf — get data value (literal or binary) ****/
    _readValueOf(Id: string): Promise<string | Uint8Array | undefined>;
    /**** _writeValueOf — set data value ****/
    _writeValueOf(Id: string, Value: string | Uint8Array | undefined): void;
    /**** _spliceValueOf — modify literal value range ****/
    _spliceValueOf(Id: string, fromIndex: number, toIndex: number, Replacement: string): void;
    /**** _getValueRefOf — return the ValueRef for *-reference entries ****/
    _getValueRefOf(Id: string): {
        Hash: string;
        Size: number;
    } | undefined;
    /**** _InfoProxyOf — get info metadata proxy object ****/
    _InfoProxyOf(Id: string): Record<string, unknown>;
    /**** _outerItemIdOf — get outer item Id ****/
    _outerItemIdOf(Id: string): string | undefined;
    /**** _innerEntriesOf — get sorted children as array-like proxy ****/
    _innerEntriesOf(DataId: string): SDS_Entry[];
    /**** _mayMoveEntryTo — check move validity ****/
    _mayMoveEntryTo(Id: string, outerItemId: string, _InsertionIndex?: number): boolean;
    /**** _mayDeleteEntry — check delete validity ****/
    _mayDeleteEntry(Id: string): boolean;
    /**** _TargetOf — get link target data ****/
    _TargetOf(Id: string): SDS_Item;
    /**** _currentValueOf — synchronously return the inline value of an item ****/
    _currentValueOf(Id: string): string | Uint8Array | undefined;
}

export { SDS_DataStoreOptions }

export { SDS_Entry }

export { SDS_EntryChangeSet }

export { SDS_Error }

export { SDS_Item }

export { SDS_Link }

export { SDS_LocalPresenceState }

export { SDS_NetworkProvider }

export { SDS_PatchSeqNumber }

export { SDS_PersistenceProvider }

export { SDS_PresenceProvider }

export { SDS_RemotePresenceState }

export { SDS_SyncCursor }

export { }
