import { Patch } from 'json-joy/lib/json-crdt-patch/index.js';
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
    /**** constructor — initialize store with model and configuration ****/
    private constructor();
    /**** fromScratch — create store from canonical empty snapshot ****/
    static fromScratch(Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromBinary — deserialize store from binary snapshot ****/
    static fromBinary(Binary: Uint8Array, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromJSON — deserialize store from base64-encoded JSON snapshot ****/
    static fromJSON(JSON_: string, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** RootItem / TrashItem / LostAndFoundItem — access special items ****/
    get RootItem(): SDS_Item;
    get TrashItem(): SDS_Item;
    get LostAndFoundItem(): SDS_Item;
    /**** EntryWithId — retrieve entry by id ****/
    EntryWithId(Id: string): SDS_Entry | undefined;
    /**** newItemAt — create new data in specified location ****/
    newItemAt(OuterItem: SDS_Item, MIMEType?: string, InsertionIndex?: number): SDS_Item;
    /**** newLinkAt — create new link in specified location ****/
    newLinkAt(TargetData: SDS_Item, OuterItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** deserializeItemInto — deserialize data from JSON into tree ****/
    deserializeItemInto(Data: any, OuterItem: SDS_Item, InsertionIndex?: number): SDS_Item;
    /**** deserializeLinkInto — deserialize link from JSON into tree ****/
    deserializeLinkInto(Data: any, OuterItem: SDS_Item, InsertionIndex?: number): SDS_Link;
    /**** EntryMayBeMovedTo — check if entry can be moved to target ****/
    EntryMayBeMovedTo(Entry: SDS_Entry, OuterItem: SDS_Item, Index?: number): boolean;
    /**** moveEntryTo — move entry to new location in tree ****/
    moveEntryTo(Entry: SDS_Entry, OuterItem: SDS_Item, Index?: number): void;
    /**** EntryMayBeDeleted — check if entry can be deleted ****/
    EntryMayBeDeleted(Entry: SDS_Entry): boolean;
    /**** deleteEntry — move entry to trash ****/
    deleteEntry(Entry: SDS_Entry): void;
    /**** purgeEntry — permanently delete entry from trash ****/
    purgeEntry(Entry: SDS_Entry): void;
    /**** purgeExpiredTrashEntries — delete trash entries older than TTL ****/
    purgeExpiredTrashEntries(TrashTTL?: number): number;
    /**** dispose — clean up resources ****/
    dispose(): void;
    /**** transact — execute callback within transaction ****/
    transact<T>(Callback: () => T): T;
    /**** onChangeInvoke — register change listener ****/
    onChangeInvoke(Handler: ChangeHandler): () => void;
    /**** applyRemotePatch — apply external patch to model ****/
    applyRemotePatch(Patch_: Patch | Uint8Array): void;
    /**** currentCursor — get current sync position ****/
    get currentCursor(): SDS_SyncCursor;
    /**** exportPatch — export patches since given cursor ****/
    exportPatch(Origin?: SDS_SyncCursor): Uint8Array;
    /**** recoverOrphans — move orphaned entries to LostAndFound ****/
    recoverOrphans(): void;
    /**** asBinary — serialize store to gzipped binary ****/
    asBinary(): Uint8Array;
    /**** asJSON — serialize store to base64-encoded binary ****/
    asJSON(): string;
    /**** get — proxy handler for property access ****/
    get(target: any, property: string | symbol): any;
    /**** set / deleteProperty / ownKeys / getOwnPropertyDescriptor — proxy traps ****/
    set(): boolean;
    deleteProperty(): boolean;
    ownKeys(): string[];
    getOwnPropertyDescriptor(): PropertyDescriptor | undefined;
    /**** _KindOf — get entry kind (data or link) ****/
    _KindOf(Id: string): 'item' | 'link';
    /**** _LabelOf — get entry label ****/
    _LabelOf(Id: string): string;
    /**** _setLabelOf — set entry label ****/
    _setLabelOf(Id: string, Value: string): void;
    /**** _TypeOf — get entry MIME type ****/
    _TypeOf(Id: string): string;
    /**** _setTypeOf — set entry MIME type ****/
    _setTypeOf(Id: string, Value: string): void;
    /**** _ValueKindOf — get value storage kind ****/
    _ValueKindOf(Id: string): 'none' | 'literal' | 'binary' | 'binary-reference' | 'literal-reference' | 'pending';
    /**** _isLiteralOf — check if entry value is literal text ****/
    _isLiteralOf(Id: string): boolean;
    /**** _isBinaryOf — check if entry value is binary ****/
    _isBinaryOf(Id: string): boolean;
    /**** _readValueOf — read entry value ****/
    _readValueOf(Id: string): Promise<string | Uint8Array | undefined>;
    /**** _writeValueOf — write entry value ****/
    _writeValueOf(Id: string, Value: string | Uint8Array | undefined): void;
    /**** _spliceValueOf — modify literal value in-place ****/
    _spliceValueOf(Id: string, Index: number, DeleteCount: number, Insertion: string): void;
    /**** _innerEntriesOf — get sorted inner entries ****/
    _innerEntriesOf(Id: string): SDS_Entry[];
    /**** _outerItemOf — get outer data ****/
    _outerItemOf(Id: string): SDS_Item | undefined;
    /**** _outerItemIdOf — get outer data id ****/
    _outerItemIdOf(Id: string): string | null;
    /**** _outerItemChainOf — get ancestor data chain ****/
    _outerItemChainOf(Id: string): SDS_Item[];
    /**** _outerItemIdsOf — get ancestor data id chain ****/
    _outerItemIdsOf(Id: string): string[];
    /**** _InfoProxyOf — get proxy for metadata access ****/
    _InfoProxyOf(Id: string): Record<string, unknown>;
    /**** _TargetOf — get link target data ****/
    _TargetOf(Id: string): SDS_Item | undefined;
    /**** _EntryAsJSON — serialize entry to JSON ****/
    _EntryAsJSON(Id: string): any;
    /**** _mayMoveEntryTo — check if move is valid ****/
    _mayMoveEntryTo(EntryId: string, outerItemId: string, Index?: number): boolean;
    /**** _mayDeleteEntry — check if entry can be deleted ****/
    _mayDeleteEntry(EntryId: string): boolean;
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
