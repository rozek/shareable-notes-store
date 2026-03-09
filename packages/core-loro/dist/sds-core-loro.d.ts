import { SDS_ChangeSet } from '@rozek/sds-core';
import { SDS_ConnectionOptions } from '@rozek/sds-core';
import { SDS_ConnectionState } from '@rozek/sds-core';
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

export declare type ChangeHandler = (Origin: ChangeOrigin, ChangeSet: SDS_ChangeSet) => void;

export declare type ChangeOrigin = 'internal' | 'external';

export { SDS_ChangeSet }

export { SDS_ConnectionOptions }

export { SDS_ConnectionState }

export declare class SDS_DataStore {
    #private;
    private constructor();
    /**** fromScratch — create a new store with root, trash, and lost-and-found items ****/
    static fromScratch(Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromBinary — restore store from gzip-compressed binary data ****/
    static fromBinary(Data: Uint8Array, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromJSON — restore store from base64-encoded JSON representation ****/
    static fromJSON(Data: unknown, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** RootItem / TrashItem / LostAndFoundItem — well-known data accessors ****/
    get RootItem(): SDS_Item;
    get TrashItem(): SDS_Item;
    get LostAndFoundItem(): SDS_Item;
    /**** EntryWithId — retrieve an entry by ID ****/
    EntryWithId(EntryId: string): SDS_Entry | undefined;
    /**** newItemAt — create a new data within an outer data ****/
    newItemAt(OuterItem: SDS_Item, Type?: string, InsertionIndex?: number): SDS_Item;
    /**** newLinkAt — create a new link within an outer data ****/
    newLinkAt(Target: SDS_Item, OuterItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** deserializeItemInto — restore a data from serialized representation ****/
    deserializeItemInto(Serialization: unknown, OuterItem: SDS_Item, InsertionIndex?: number): SDS_Item;
    /**** deserializeLinkInto — restore a link from serialized representation ****/
    deserializeLinkInto(Serialization: unknown, OuterItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** EntryMayBeMovedTo — check if an entry can be moved to an outer data ****/
    EntryMayBeMovedTo(Entry: SDS_Entry, OuterItem: SDS_Item, InsertionIndex?: number): boolean;
    /**** moveEntryTo — move an entry to a different outer data ****/
    moveEntryTo(Entry: SDS_Entry, OuterItem: SDS_Item, InsertionIndex?: number): void;
    /**** EntryMayBeDeleted — check if an entry can be deleted ****/
    EntryMayBeDeleted(Entry: SDS_Entry): boolean;
    /**** deleteEntry — move an entry to trash ****/
    deleteEntry(Entry: SDS_Entry): void;
    /**** purgeEntry — permanently delete a trash entry ****/
    purgeEntry(Entry: SDS_Entry): void;
    /**** purgeExpiredTrashEntries — auto-purge trash entries older than TTL ****/
    purgeExpiredTrashEntries(TTLms?: number): number;
    /**** dispose — cleanup and stop background timers ****/
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
    /**** asJSON — export store as base64-encoded binary ****/
    asJSON(): string;
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
    /**** _isLiteralOf — check if value is a literal string ****/
    _isLiteralOf(Id: string): boolean;
    /**** _isBinaryOf — check if value is binary data ****/
    _isBinaryOf(Id: string): boolean;
    /**** _readValueOf — read entry value (literal or binary) ****/
    _readValueOf(Id: string): Promise<string | Uint8Array | undefined>;
    /**** _writeValueOf — write entry value with automatic storage strategy ****/
    _writeValueOf(Id: string, Value: string | Uint8Array | undefined): void;
    /**** _spliceValueOf — modify literal value text at a range ****/
    _spliceValueOf(Id: string, fromIndex: number, toIndex: number, Replacement: string): void;
    /**** _InfoProxyOf — get proxy for arbitrary metadata object ****/
    _InfoProxyOf(Id: string): Record<string, unknown>;
    /**** _outerItemOf — get the outer data ****/
    _outerItemOf(Id: string): SDS_Item | undefined;
    /**** _outerItemIdOf — get outer data ID or undefined ****/
    _outerItemIdOf(Id: string): string | undefined;
    /**** _outerItemChainOf — get ancestor chain from entry to root ****/
    _outerItemChainOf(Id: string): SDS_Item[];
    /**** _outerItemIdsOf — get ancestor IDs from entry to root ****/
    _outerItemIdsOf(Id: string): string[];
    /**** _innerEntriesOf — get inner entries as proxy-wrapped array ****/
    _innerEntriesOf(DataId: string): SDS_Entry[];
    /**** _mayMoveEntryTo — check if entry can be moved without cycles ****/
    _mayMoveEntryTo(Id: string, outerItemId: string, _InsertionIndex?: number): boolean;
    /**** _mayDeleteEntry — check if entry is deletable ****/
    _mayDeleteEntry(Id: string): boolean;
    /**** _TargetOf — get the target data for a link ****/
    _TargetOf(Id: string): SDS_Item;
    /**** _EntryAsJSON — serialize entry and subtree to JSON ****/
    _EntryAsJSON(Id: string): unknown;
}

export declare interface SDS_DataStoreOptions {
    LiteralSizeLimit?: number;
    TrashTTLms?: number;
    TrashCheckIntervalMs?: number;
}

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
