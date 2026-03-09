/*******************************************************************************
*                                                                              *
*        SDS_Link — points to a fixed target Data, set at creation time        *
*                                                                              *
*******************************************************************************/

import { SDS_DataStore }     from './SDS_DataStore.js'
import type { SDS_LinkJSON } from './SDS_DataStore.js'
import { SDS_Entry }         from './SDS_Entry.js'
import type { SDS_Item }     from './SDS_Item.js'

export class SDS_Link extends SDS_Entry {
  constructor (Store:SDS_DataStore, Id:string) {
    super(Store, Id)
  }

/**** Target ****/

  get Target ():SDS_Item {
    return this._Store._TargetOf(this.Id)
  }

//----------------------------------------------------------------------------//
//                               Serialisation                                //
//----------------------------------------------------------------------------//

/**** asJSON — serialise this link as a plain JSON object ****/

  override asJSON ():SDS_LinkJSON {
    return this._Store._EntryAsJSON(this.Id) as SDS_LinkJSON
  }
}
