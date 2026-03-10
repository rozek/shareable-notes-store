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
    private constructor();
    /**** fromScratch — create a new store with root, trash, and lost-and-found items ****/
    static fromScratch(Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromBinary — restore store from gzip-compressed binary data ****/
    static fromBinary(Data: Uint8Array, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromJSON — restore store from a plain JSON object or its JSON.stringify representation ****/
    static fromJSON(Serialisation: unknown, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** RootItem / TrashItem / LostAndFoundItem — well-known data accessors ****/
    get RootItem(): SDS_Item;
    get TrashItem(): SDS_Item;
    get LostAndFoundItem(): SDS_Item;
    /**** EntryWithId — retrieve an entry by Id ****/
    EntryWithId(EntryId: string): SDS_Entry | undefined;
    /**** newItemAt — create a new item of given type as inner entry of outerItem ****/
    newItemAt(MIMEType: string | undefined, outerItem: SDS_Item, InsertionIndex?: number): SDS_Item;
    /**** newLinkAt — create a new link within an outer data ****/
    newLinkAt(Target: SDS_Item, outerItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** deserializeItemInto — import item subtree; always remaps all IDs ****/
    deserializeItemInto(Serialisation: unknown, outerItem: SDS_Item, InsertionIndex?: number): SDS_Item;
    /**** deserializeLinkInto — import link; always assigns a new Id ****/
    deserializeLinkInto(Serialisation: unknown, outerItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** moveEntryTo — move an entry to a different outer data ****/
    moveEntryTo(Entry: SDS_Entry, outerItem: SDS_Item, InsertionIndex?: number): void;
    /**** _rebalanceInnerEntriesOf — backend-specific raw rebalance; caller must hold a transaction ****/
    _rebalanceInnerEntriesOf(outerItemId: string): void;
    /**** deleteEntry — move entry to trash with timestamp ****/
    deleteEntry(Entry: SDS_Entry): void;
    /**** purgeEntry — permanently delete a trash entry ****/
    purgeEntry(Entry: SDS_Entry): void;
    /**** purgeExpiredTrashEntries — auto-purge trash entries older than TTL ****/
    purgeExpiredTrashEntries(TTLms?: number): number;
    /**** dispose — stop background timer and remove all change listeners ****/
    dispose(): void;
    /**** transact — execute operations within a batch transaction ****/
    transact(Callback: () => void): void;
    /**** onChangeInvoke — register a change listener and return unsubscribe function ****/
    onChangeInvoke(Handler: ChangeHandler): () => void;
    /**** applyRemotePatch — merge remote changes and rebuild indices ****/
    applyRemotePatch(encodedPatch: Uint8Array): void;
    /**** currentCursor — get current version vector as sync cursor ****/
    get currentCursor(): SDS_SyncCursor;
    /**** exportPatch — generate a change patch since a given cursor ****/
    exportPatch(sinceCursor?: SDS_SyncCursor): Uint8Array;
    /**** recoverOrphans — move entries with missing parents to lost-and-found ****/
    recoverOrphans(): void;
    /**** asBinary — export store as gzip-compressed Loro snapshot ****/
    asBinary(): Uint8Array;
    /**** newEntryFromBinaryAt — import a gzip-compressed entry (item or link) ****/
    newEntryFromBinaryAt(Serialisation: Uint8Array, outerItem: SDS_Item, InsertionIndex?: number): SDS_Entry;
    /**** _EntryAsBinary — gzip-compress the JSON representation of an entry ****/
    _EntryAsBinary(Id: string): Uint8Array;
    /**** _KindOf — get entry kind (data or link) ****/
    _KindOf(Id: string): 'item' | 'link';
    /**** _LabelOf — get entry label text ****/
    _LabelOf(Id: string): string;
    /**** _setLabelOf — set entry label text ****/
    _setLabelOf(Id: string, Value: string): void;
    /**** _TypeOf — get entry MIME type ****/
    _TypeOf(Id: string): string;
    /**** _setTypeOf — set entry MIME type ****/
    _setTypeOf(Id: string, Value: string): void;
    /**** _ValueKindOf — get value kind (none, literal, binary, reference types) ****/
    _ValueKindOf(Id: string): 'none' | 'literal' | 'binary' | 'binary-reference' | 'literal-reference' | 'pending';
    /**** _readValueOf — read entry value (literal or binary) ****/
    _readValueOf(Id: string): Promise<string | Uint8Array | undefined>;
    /**** _writeValueOf — write entry value with automatic storage strategy ****/
    _writeValueOf(Id: string, Value: string | Uint8Array | undefined): void;
    /**** _spliceValueOf — modify literal value text at a range ****/
    _spliceValueOf(Id: string, fromIndex: number, toIndex: number, Replacement: string): void;
    /**** _getValueRefOf — return the ValueRef for *-reference entries ****/
    _getValueRefOf(Id: string): {
        Hash: string;
        Size: number;
    } | undefined;
    /**** _InfoProxyOf — get proxy for arbitrary metadata object ****/
    _InfoProxyOf(Id: string): Record<string, unknown>;
    /**** _outerItemIdOf — get outer item Id or undefined ****/
    _outerItemIdOf(Id: string): string | undefined;
    /**** _innerEntriesOf — get inner entries as proxy-wrapped array ****/
    _innerEntriesOf(DataId: string): SDS_Entry[];
    /**** _mayMoveEntryTo — check if entry can be moved without cycles ****/
    _mayMoveEntryTo(Id: string, outerItemId: string, _InsertionIndex?: number): boolean;
    /**** _mayDeleteEntry — check if entry is deletable ****/
    _mayDeleteEntry(Id: string): boolean;
    /**** _TargetOf — get the target data for a link ****/
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
