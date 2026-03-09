export declare type ChangeHandler = (Origin: ChangeOrigin, ChangeSet: SDS_ChangeSet) => void;

declare type ChangeHandler_2 = (Origin: ChangeOrigin_2, ChangeSet: SDS_ChangeSet) => void;

export declare type ChangeOrigin = 'internal' | 'external';

declare type ChangeOrigin_2 = 'internal' | 'external';

export declare class SDS_BrowserPersistenceProvider implements SDS_PersistenceProvider {
    #private;
    /**** constructor ****/
    constructor(StoreId: string);
    /**** loadSnapshot ****/
    loadSnapshot(): Promise<Uint8Array | undefined>;
    /**** saveSnapshot ****/
    saveSnapshot(Data: Uint8Array): Promise<void>;
    /**** loadPatchesSince ****/
    loadPatchesSince(SeqNumber: SDS_PatchSeqNumber): Promise<Uint8Array[]>;
    /**** appendPatch ****/
    appendPatch(Patch: Uint8Array, SeqNumber: SDS_PatchSeqNumber): Promise<void>;
    /**** prunePatches ****/
    prunePatches(beforeSeqNumber: SDS_PatchSeqNumber): Promise<void>;
    /**** loadValue ****/
    loadValue(ValueHash: string): Promise<Uint8Array | undefined>;
    /**** saveValue ****/
    saveValue(ValueHash: string, Data: Uint8Array): Promise<void>;
    /**** releaseValue ****/
    releaseValue(ValueHash: string): Promise<void>;
    /**** close ****/
    close(): Promise<void>;
}

export declare type SDS_ChangeSet = Record<string, SDS_EntryChangeSet>;

export declare interface SDS_ConnectionOptions {
    Token: string;
    reconnectDelayMs?: number;
}

/*******************************************************************************
 *                                                                              *
 *                            SDS_NetworkProvider                               *
 *                                                                              *
 *******************************************************************************/
export declare type SDS_ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

export declare class SDS_Data extends SDS_Entry {
    constructor(Store: SDS_DataStore_2 & Record<string, any>, Id: string);
    /**** Type / ValueKind / isLiteral / isBinary ****/
    get Type(): string;
    set Type(Type: string);
    get ValueKind(): 'none' | 'literal' | 'literal-reference' | 'binary' | 'binary-reference' | 'pending';
    get isLiteral(): boolean;
    get isBinary(): boolean;
    /**** readValue — resolves inline values immediately, fetches blobs async ****/
    readValue(): Promise<string | Uint8Array | undefined>;
    /**** writeValue — chooses ValueKind automatically based on type/size ****/
    writeValue(Value: string | Uint8Array | undefined): void;
    /**** changeValue — collaborative character-level edit (literal only) ****/
    changeValue(fromIndex: number, toIndex: number, Replacement: string): void;
    /**** innerEntryList ****/
    get innerEntryList(): SDS_Entry[];
}

export declare class SDS_DataStore {
    #private;
    /**** constructor — initialise store from document and options ****/
    private constructor();
    /**** fromScratch — build initial document with three well-known data items ****/
    static fromScratch(Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromBinary — restore store from compressed update ****/
    static fromBinary(Data: Uint8Array, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** fromJSON — restore store from base64-encoded data ****/
    static fromJSON(Data: unknown, Options?: SDS_DataStoreOptions): SDS_DataStore;
    /**** RootData / TrashData / LostAndFoundData — access system data items ****/
    get RootData(): SDS_Data;
    get TrashData(): SDS_Data;
    get LostAndFoundData(): SDS_Data;
    /**** EntryWithId — retrieve entry by ID ****/
    EntryWithId(EntryId: string): SDS_Entry | undefined;
    /**** newNoteAt — create data as inner data of outer data ****/
    newNoteAt(OuterNote: SDS_Data, Type?: string, InsertionIndex?: number): SDS_Data;
    /**** newLinkAt — create link as inner link of outer data ****/
    newLinkAt(Target: SDS_Data, OuterNote: SDS_Data, InsertionIndex?: number): SDS_Link;
    /**** deserializeNoteInto — import data subtree with remapped IDs ****/
    deserializeNoteInto(Serialization: unknown, OuterNote: SDS_Data, InsertionIndex?: number): SDS_Data;
    /**** deserializeLinkInto — import link with remapped target ID ****/
    deserializeLinkInto(Serialization: unknown, OuterNote: SDS_Data, InsertionIndex?: number): SDS_Link;
    /**** EntryMayBeMovedTo — check if entry can move to new outer data ****/
    EntryMayBeMovedTo(Entry: SDS_Entry, OuterNote: SDS_Data, InsertionIndex?: number): boolean;
    /**** moveEntryTo — move entry to new outer data and position ****/
    moveEntryTo(Entry: SDS_Entry, OuterNote: SDS_Data, InsertionIndex?: number): void;
    /**** EntryMayBeDeleted — check if entry can be deleted ****/
    EntryMayBeDeleted(Entry: SDS_Entry): boolean;
    /**** deleteEntry — move entry to trash with timestamp ****/
    deleteEntry(Entry: SDS_Entry): void;
    /**** purgeEntry — permanently delete entry and subtree ****/
    purgeEntry(Entry: SDS_Entry): void;
    /**** purgeExpiredTrashEntries — remove trash data items past TTL ****/
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
    /**** asJSON — export as base64-encoded compressed update ****/
    asJSON(): string;
    /**** _KindOf — get entry kind ****/
    _KindOf(Id: string): 'data' | 'link';
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
    /**** _isLiteralOf — check if data has literal value ****/
    _isLiteralOf(Id: string): boolean;
    /**** _isBinaryOf — check if data has binary value ****/
    _isBinaryOf(Id: string): boolean;
    /**** _readValueOf — get data value (literal or binary) ****/
    _readValueOf(Id: string): Promise<string | Uint8Array | undefined>;
    /**** _writeValueOf — set data value ****/
    _writeValueOf(Id: string, Value: string | Uint8Array | undefined): void;
    /**** _spliceValueOf — modify literal value range ****/
    _spliceValueOf(Id: string, fromIndex: number, toIndex: number, Replacement: string): void;
    /**** _InfoProxyOf — get info metadata proxy object ****/
    _InfoProxyOf(Id: string): Record<string, unknown>;
    /**** _outerNoteOf — get outer data ****/
    _outerNoteOf(Id: string): SDS_Data | undefined;
    /**** _outerNoteIdOf — get outer data ID ****/
    _outerNoteIdOf(Id: string): string | undefined;
    /**** _outerNotesOf — get ancestor chain ****/
    _outerNotesOf(Id: string): SDS_Data[];
    /**** _outerNoteIdsOf — get ancestor IDs ****/
    _outerNoteIdsOf(Id: string): string[];
    /**** _innerEntriesOf — get sorted children as array-like proxy ****/
    _innerEntriesOf(NoteId: string): SDS_Entry[];
    /**** _mayMoveEntryTo — check move validity ****/
    _mayMoveEntryTo(Id: string, outerNoteId: string, _InsertionIndex?: number): boolean;
    /**** _mayDeleteEntry — check delete validity ****/
    _mayDeleteEntry(Id: string): boolean;
    /**** _TargetOf — get link target data ****/
    _TargetOf(Id: string): SDS_Data;
    /**** _EntryAsJSON — serialize entry and subtree ****/
    _EntryAsJSON(Id: string): unknown;
}

declare interface SDS_DataStore_2 {
    readonly currentCursor: SDS_SyncCursor;
    /**** onChangeInvoke — registers a change listener, returns unsubscribe fn ****/
    onChangeInvoke(Handler: ChangeHandler_2): () => void;
    /**** exportPatch — exports changes since sinceCursor; full snapshot if omitted ****/
    exportPatch(sinceCursor?: SDS_SyncCursor): Uint8Array;
    /**** applyRemotePatch - apply patch from a remote peer ****/
    applyRemotePatch(encodedPatch: Uint8Array): void;
    /**** asBinary — serialise entire store as compressed binary (for checkpoints) ****/
    asBinary(): Uint8Array;
}

export declare interface SDS_DataStoreOptions {
    LiteralSizeLimit?: number;
    TrashTTLms?: number;
    TrashCheckIntervalMs?: number;
}

export declare class SDS_Entry {
    protected readonly _Store: StoreBackend;
    readonly Id: string;
    constructor(_Store: StoreBackend, Id: string);
    /**** isRootData / isTrashData / isLostAndFoundData / isNote / isLink ****/
    get isRootData(): boolean;
    get isTrashData(): boolean;
    get isLostAndFoundData(): boolean;
    get isNote(): boolean;
    get isLink(): boolean;
    /**** outerNote / outerNoteId / outerNotes / outerNoteIds ****/
    get outerNote(): SDS_Data | undefined;
    get outerNoteId(): string | undefined;
    get outerNotes(): SDS_Data[];
    get outerNoteIds(): string[];
    /**** Label / Info ****/
    get Label(): string;
    set Label(Value: string);
    get Info(): Record<string, unknown>;
    /**** mayBeMovedTo ****/
    mayBeMovedTo(OuterNote: SDS_Data, InsertionIndex?: number): boolean;
    /**** moveTo ****/
    moveTo(OuterNote: SDS_Data, InsertionIndex?: number): void;
    /**** mayBeDeleted ****/
    get mayBeDeleted(): boolean;
    /**** delete ****/
    delete(): void;
    /**** purge ****/
    purge(): void;
    /**** asJSON ****/
    asJSON(): unknown;
}

/*******************************************************************************
 *                                                                              *
 * SDS_EntryChangeSet - the set of prop. names that changed for a single entry  *
 *                                                                              *
 *******************************************************************************/
export declare type SDS_EntryChangeSet = Set<string>;

/*******************************************************************************
 *                                                                              *
 *                                  SDS_Error                                   *
 *                                                                              *
 *******************************************************************************/
export declare class SDS_Error extends Error {
    readonly Code: string;
    constructor(Code: string, Message: string);
}

export declare class SDS_Link extends SDS_Entry {
    constructor(Store: SDS_DataStore_2 & Record<string, any>, Id: string);
    /**** Target ****/
    get Target(): SDS_Data;
}

/*******************************************************************************
 *                                                                              *
 *                           SDS_PresenceProvider                               *
 *                                                                              *
 *******************************************************************************/
export declare interface SDS_LocalPresenceState {
    PeerId?: string;
    UserName?: string;
    UserColor?: string;
    UserFocus?: {
        EntryId: string;
        Property: 'Value' | 'Label' | 'Info';
        Cursor?: {
            from: number;
            to: number;
        };
    };
    custom?: unknown;
}

export declare interface SDS_NetworkProvider {
    readonly StoreID: string;
    readonly ConnectionState: SDS_ConnectionState;
    /**** connect — open an authenticated connection to a relay server ****/
    connect(URL: string, Options: SDS_ConnectionOptions): Promise<void>;
    /**** disconnect — close connection and cancel any pending reconnect ****/
    disconnect(): void;
    /**** sendPatch — broadcast a CRDT patch to all connected peers ****/
    sendPatch(Patch: Uint8Array): void;
    /**** sendValue — upload a large value blob identified by its SHA-256 hash ****/
    sendValue(ValueHash: string, Data: Uint8Array): void;
    /**** requestValue — ask the relay to deliver a value blob by its hash ****/
    requestValue(ValueHash: string): void;
    /**** onPatch — subscribe to incoming CRDT patches; returns unsubscribe fn ****/
    onPatch(Callback: (Patch: Uint8Array) => void): () => void;
    /**** onValue — subscribe to incoming value blobs; returns unsubscribe fn ****/
    onValue(Callback: (ValueHash: string, Value: Uint8Array) => void): () => void;
    /**** onConnectionChange — subscribe to connection-state changes; returns unsubscribe fn ****/
    onConnectionChange(Callback: (ConnectionState: SDS_ConnectionState) => void): () => void;
}

export declare type SDS_PatchSeqNumber = number;

export declare interface SDS_PersistenceProvider {
    /**** loadSnapshot — load most recent full snapshot, or undefined if none exists ****/
    loadSnapshot(): Promise<Uint8Array | undefined>;
    /**** saveSnapshot — persist a full snapshot, replacing any previous one ****/
    saveSnapshot(Data: Uint8Array): Promise<void>;
    /**** loadPatchesSince — load all patches with SeqNumber > given value ****/
    loadPatchesSince(SeqNumber: SDS_PatchSeqNumber): Promise<Uint8Array[]>;
    /**** appendPatch — append a patch at the given sequence position ****/
    appendPatch(Patch: Uint8Array, SeqNumber: SDS_PatchSeqNumber): Promise<void>;
    /**** prunePatches — delete all patches with SeqNumber < given value ****/
    prunePatches(beforeSeqNumber: SDS_PatchSeqNumber): Promise<void>;
    /**** loadValue — load a large value blob by its SHA-256 hex hash ****/
    loadValue(ValueHash: string): Promise<Uint8Array | undefined>;
    /**** saveValue — store a large value blob under its SHA-256 hex hash ****/
    saveValue(ValueHash: string, Data: Uint8Array): Promise<void>;
    /**** releaseValue — decrement ref-count; delete the blob when it reaches zero ****/
    releaseValue(ValueHash: string): Promise<void>;
    /**** close — release all held resources ****/
    close(): Promise<void>;
}

export declare interface SDS_PresenceProvider {
    /**** sendLocalState — broadcast the local client's presence state to all peers ****/
    sendLocalState(localPresenceState: SDS_LocalPresenceState): void;
    /**** onRemoteState — subscribe to peer state updates; State===undefined means offline ****/
    onRemoteState(Callback: (PeerID: string, State: SDS_RemotePresenceState | undefined) => void): () => void;
    readonly PeerSet: ReadonlyMap<string, SDS_RemotePresenceState>;
}

export declare interface SDS_RemotePresenceState extends SDS_LocalPresenceState {
    PeerId: string;
    lastSeen: number;
}

/*******************************************************************************
 *                                                                              *
 *                          SDS_PersistenceProvider                             *
 *                                                                              *
 *******************************************************************************/
export declare type SDS_SyncCursor = Uint8Array;

export declare class SDS_SyncEngine {
    #private;
    readonly PeerId: string;
    constructor(Store: SDS_DataStore_2, Options?: SDS_SyncEngineOptions);
    /**** start ****/
    start(): Promise<void>;
    /**** stop ****/
    stop(): Promise<void>;
    /**** connectTo ****/
    connectTo(URL: string, Options: SDS_ConnectionOptions): Promise<void>;
    /**** disconnect ****/
    disconnect(): void;
    /**** reconnect ****/
    reconnect(): Promise<void>;
    /**** ConnectionState ****/
    get ConnectionState(): SDS_ConnectionState;
    /**** onConnectionChange ****/
    onConnectionChange(Callback: (State: SDS_ConnectionState) => void): () => void;
    /**** setPresenceTo ****/
    setPresenceTo(State: Omit<SDS_LocalPresenceState, never>): void;
    /**** PeerSet (remote peers only) ****/
    get PeerSet(): ReadonlyMap<string, SDS_RemotePresenceState>;
    /**** onPresenceChange ****/
    onPresenceChange(Callback: (PeerId: string, State: SDS_RemotePresenceState | undefined, Origin: 'local' | 'remote') => void): () => void;
}

export declare interface SDS_SyncEngineOptions {
    PersistenceProvider?: SDS_PersistenceProvider;
    NetworkProvider?: SDS_NetworkProvider;
    PresenceProvider?: SDS_PresenceProvider;
    BroadcastChannel?: boolean;
    PresenceTimeoutMs?: number;
}

export declare class SDS_WebRTCProvider implements SDS_NetworkProvider, SDS_PresenceProvider {
    #private;
    readonly StoreID: string;
    /**** Constructor ****/
    constructor(StoreId: string, Options?: SDS_WebRTCProviderOptions);
    /**** ConnectionState ****/
    get ConnectionState(): SDS_ConnectionState;
    /**** connect ****/
    connect(URL: string, Options: SDS_ConnectionOptions): Promise<void>;
    /**** disconnect ****/
    disconnect(): void;
    /**** sendPatch ****/
    sendPatch(Patch: Uint8Array): void;
    /**** sendValue ****/
    sendValue(ValueHash: string, Data: Uint8Array): void;
    /**** requestValue ****/
    requestValue(ValueHash: string): void;
    /**** onPatch ****/
    onPatch(Callback: (Patch: Uint8Array) => void): () => void;
    /**** onValue ****/
    onValue(Callback: (Hash: string, Data: Uint8Array) => void): () => void;
    /**** onConnectionChange ****/
    onConnectionChange(Callback: (State: SDS_ConnectionState) => void): () => void;
    /**** sendLocalState ****/
    sendLocalState(State: SDS_LocalPresenceState): void;
    /**** onRemoteState ****/
    onRemoteState(Callback: (PeerId: string, State: SDS_RemotePresenceState | undefined) => void): () => void;
    /**** PeerSet ****/
    get PeerSet(): ReadonlyMap<string, SDS_RemotePresenceState>;
}

export declare interface SDS_WebRTCProviderOptions {
    ICEServers?: RTCIceServer[];
    Fallback?: SDS_WebSocketProvider;
}

export declare class SDS_WebSocketProvider implements SDS_NetworkProvider, SDS_PresenceProvider {
    #private;
    readonly StoreID: string;
    /**** constructor ****/
    constructor(StoreId: string);
    /**** ConnectionState ****/
    get ConnectionState(): SDS_ConnectionState;
    /**** connect ****/
    connect(URL: string, Options: SDS_ConnectionOptions): Promise<void>;
    /**** disconnect ****/
    disconnect(): void;
    /**** sendPatch ****/
    sendPatch(Patch: Uint8Array): void;
    /**** sendValue ****/
    sendValue(ValueHash: string, Data: Uint8Array): void;
    /**** requestValue ****/
    requestValue(ValueHash: string): void;
    /**** onPatch ****/
    onPatch(Callback: (Patch: Uint8Array) => void): () => void;
    /**** onValue ****/
    onValue(Callback: (ValueHash: string, Value: Uint8Array) => void): () => void;
    /**** onConnectionChange ****/
    onConnectionChange(Callback: (State: SDS_ConnectionState) => void): () => void;
    /**** sendLocalState ****/
    sendLocalState(State: SDS_LocalPresenceState): void;
    /**** onRemoteState ****/
    onRemoteState(Callback: (PeerId: string, State: SDS_RemotePresenceState | undefined) => void): () => void;
    /**** PeerSet ****/
    get PeerSet(): ReadonlyMap<string, SDS_RemotePresenceState>;
}

declare type StoreBackend = SDS_DataStore_2 & Record<string, any>;

export { }
