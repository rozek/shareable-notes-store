/*******************************************************************************
*                                                                              *
*                                  SDS Core                                    *
*                                                                              *
*******************************************************************************/

// backend-agnostic shared types and interfaces, consumed by all SDS backend 
// packages (sds-core-jj, sds-core-yjs, sds-core-loro) and by the infrastructure
// packages (sync-engine, network, persistence).                                                                

export { SDS_Error } from './error/SDS_Error.js'

export {
  RootId, TrashId, LostAndFoundId,
  DefaultMIMEType, DefaultLiteralSizeLimit,
  DefaultBinarySizeLimit, DefaultWrapperCacheSize,
  maxLabelLength, maxMIMETypeLength, maxInfoKeyLength, maxInfoValueSize,
  maxOrderKeyLength,
}                        from './store/SDS_Constants.js'
export { SDS_DataStore, _UInt8ArrayToBase64 as _uint8ArrayToBase64, _Base64ToUint8Array as _base64ToUint8Array } from './store/SDS_DataStore.js'
export type {
  ChangeOrigin, ChangeHandler, SDS_DataStoreOptions,
  SDS_LinkJSON, SDS_ItemJSON, SDS_EntryJSON,
} from './store/SDS_DataStore.js'
export {
  validateLabel as expectValidLabel, validateMIMEType as expectValidMIMEType, validateInfoKey as expectValidInfoKey, validateInfoValue as checkInfoValueSize,
}                        from './store/SDS_Validation.js'
export { SDS_Entry }     from './store/SDS_Entry.js'
export { SDS_Item }      from './store/SDS_Item.js'
export { SDS_Link }      from './store/SDS_Link.js'

export type { SDS_ChangeSet }      from './changeset/SDS_ChangeSet.js'
export type { SDS_EntryChangeSet } from './changeset/SDS_EntryChangeSet.js'

export type { SDS_SyncCursor, SDS_PatchSeqNumber, SDS_PersistenceProvider }
                                   from './interfaces/SDS_PersistenceProvider.js'
export type {
  SDS_NetworkProvider,
  SDS_ConnectionOptions,
  SDS_ConnectionState,
}                                    from './interfaces/SDS_NetworkProvider.js'
export type { SDS_PresenceProvider } from './interfaces/SDS_PresenceProvider.js'
export type {
  SDS_LocalPresenceState,
  SDS_RemotePresenceState,
}                                    from './interfaces/SDS_PresenceProvider.js'
