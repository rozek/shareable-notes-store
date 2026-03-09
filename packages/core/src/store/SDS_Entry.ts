/*******************************************************************************
*                                                                              *
*               SDS_Entry — base class for SDS_Item and SDS_Link               *
*                                                                              *
*******************************************************************************/

import type { SDS_DataStore } from '../interfaces/SDS_DataStore.js'
import type { SDS_Item }      from './SDS_Item.js'
import { RootId, TrashId, LostAndFoundId } from './constants.js'

// allows bracket-notation access to internal store methods not declared on the
// minimal SDS_DataStore interface, while keeping the constructor type-safe

type StoreBackend = SDS_DataStore & Record<string, any>

export class SDS_Entry {
  constructor (
    protected readonly _Store:StoreBackend,
    readonly Id:string,
  ) {}

//----------------------------------------------------------------------------//
//                                  Identity                                  //
//----------------------------------------------------------------------------//

/**** isRootItem / isTrashItem / isLostAndFoundItem / isItem / isLink ****/

  get isRootItem ():         boolean { return this.Id === RootId }
  get isTrashItem ():        boolean { return this.Id === TrashId }
  get isLostAndFoundItem (): boolean { return this.Id === LostAndFoundId }
  get isItem ():             boolean { return this._Store['_KindOf'](this.Id) === 'item' }
  get isLink ():             boolean { return this._Store['_KindOf'](this.Id) === 'link' }

//----------------------------------------------------------------------------//
//                                 Hierarchy                                  //
//----------------------------------------------------------------------------//

/**** outerItem / outerItemId / outerItemChain / outerItemIds ****/

  get outerItem ():SDS_Item | undefined {
    return this._Store['_outerItemOf'](this.Id)
  }

  get outerItemId ():string | undefined {
    return this._Store['_outerItemIdOf'](this.Id)
  }

  get outerItemChain ():SDS_Item[] {
    return this._Store['_outerItemChainOf'](this.Id)
  }

  get outerItemIds ():string[] {
    return this._Store['_outerItemIdsOf'](this.Id)
  }

//----------------------------------------------------------------------------//
//                                Description                                 //
//----------------------------------------------------------------------------//

/**** Label / Info ****/

  get Label ():string       { return this._Store['_LabelOf'](this.Id) }
  set Label (Value:string)  { this._Store['_setLabelOf'](this.Id, Value) }

  get Info ():Record<string,unknown> {
    return this._Store['_InfoProxyOf'](this.Id)
  }

//----------------------------------------------------------------------------//
//                                   Move                                     //
//----------------------------------------------------------------------------//

/**** mayBeMovedTo ****/

  mayBeMovedTo (OuterItem:SDS_Item, InsertionIndex?:number):boolean {
    return this._Store['_mayMoveEntryTo'](this.Id, OuterItem.Id, InsertionIndex)
  }

/**** moveTo ****/

  moveTo (OuterItem:SDS_Item, InsertionIndex?:number):void {
    this._Store['moveEntryTo'](this, OuterItem, InsertionIndex)
  }

//----------------------------------------------------------------------------//
//                                  Delete                                    //
//----------------------------------------------------------------------------//

/**** mayBeDeleted ****/

  get mayBeDeleted ():boolean {
    return this._Store['_mayDeleteEntry'](this.Id)
  }

/**** delete ****/

  delete ():void { this._Store['deleteEntry'](this) }

/**** purge ****/

  purge ():void  { this._Store['purgeEntry'](this) }

//----------------------------------------------------------------------------//
//                              Serialisation                                 //
//----------------------------------------------------------------------------//

/**** asJSON ****/

  asJSON ():unknown { return this._Store['_EntryAsJSON'](this.Id) }
}
