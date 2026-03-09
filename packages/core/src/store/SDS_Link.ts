/*******************************************************************************
*                                                                              *
*        SDS_Link — points to a fixed target Data, set at creation time        *
*                                                                              *
*******************************************************************************/

import      { SDS_Entry }     from './SDS_Entry.js'
import type { SDS_Item }      from './SDS_Item.js'
import type { SDS_DataStore } from '../interfaces/SDS_DataStore.js'

export class SDS_Link extends SDS_Entry {
  constructor (Store:SDS_DataStore & Record<string,any>, Id:string) {
    super(Store, Id)
  }

/**** Target ****/

  get Target ():SDS_Item {
    return this._Store['_TargetOf'](this.Id)
  }
}
