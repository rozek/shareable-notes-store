import { SDS_PatchSeqNumber } from '@rozek/sds-core';
import { SDS_PersistenceProvider } from '@rozek/sds-core';

export declare class SDS_DesktopPersistenceProvider implements SDS_PersistenceProvider {
    #private;
    /**** constructor ****/
    constructor(DbPath: string, StoreId: string);
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

export { }
