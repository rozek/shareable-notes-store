import { SDS_ConnectionOptions } from '@rozek/sds-core';
import { SDS_ConnectionState } from '@rozek/sds-core';
import { SDS_DataStore } from '@rozek/sds-core';
import { SDS_LocalPresenceState } from '@rozek/sds-core';
import { SDS_NetworkProvider } from '@rozek/sds-core';
import { SDS_PersistenceProvider } from '@rozek/sds-core';
import { SDS_PresenceProvider } from '@rozek/sds-core';
import { SDS_RemotePresenceState } from '@rozek/sds-core';

export declare class SDS_SyncEngine {
    #private;
    readonly PeerId: string;
    constructor(Store: SDS_DataStore, Options?: SDS_SyncEngineOptions);
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

export { }
