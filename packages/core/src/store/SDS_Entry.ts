/*******************************************************************************
*                                                                              *
*               SDS_Entry — base class for SDS_Item and SDS_Link               *
*                                                                              *
*******************************************************************************/

import { SDS_DataStore }             from './SDS_DataStore.js'
import type { SDS_EntryJSON }        from './SDS_DataStore.js'
import type { SDS_Item }             from './SDS_Item.js'
import { RootId, TrashId, LostAndFoundId } from './SDS_Constants.js'
import { SDS_Error }                 from '../error/SDS_Error.js'
import { validateLabel }             from './SDS_Validation.js'

export class SDS_Entry {
  constructor (
    protected readonly _Store:SDS_DataStore,
    readonly Id:string,
  ) {}

//----------------------------------------------------------------------------//
//                                  Identity                                  //
//----------------------------------------------------------------------------//

/**** isRootItem / isTrashItem / isLostAndFoundItem / isItem / isLink ****/

  get isRootItem ():         boolean { return this.Id === RootId }
  get isTrashItem ():        boolean { return this.Id === TrashId }
  get isLostAndFoundItem (): boolean { return this.Id === LostAndFoundId }
  get isItem ():             boolean { return this._Store._KindOf(this.Id) === 'item' }
  get isLink ():             boolean { return this._Store._KindOf(this.Id) === 'link' }

//----------------------------------------------------------------------------//
//                                 Hierarchy                                  //
//----------------------------------------------------------------------------//

/**** outerItem / outerItemId / outerItemChain / outerItemIds ****/

  get outerItem ():SDS_Item | undefined {
    return this._Store._outerItemOf(this.Id)
  }

  get outerItemId ():string | undefined {
    return this._Store._outerItemIdOf(this.Id)
  }

  get outerItemChain ():SDS_Item[] {
    return this._Store._outerItemChainOf(this.Id)
  }

  get outerItemIds ():string[] {
    return this._Store._outerItemIdsOf(this.Id)
  }

//----------------------------------------------------------------------------//
//                                Description                                 //
//----------------------------------------------------------------------------//

/**** Label / Info ****/

  get Label ():string      { return this._Store._LabelOf(this.Id) }
  set Label (Value:string) {
    validateLabel(Value)
    this._Store._setLabelOf(this.Id, Value)
  }

  get Info ():Record<string,unknown> {
    return this._Store._InfoProxyOf(this.Id)
  }

//----------------------------------------------------------------------------//
//                                   Move                                     //
//----------------------------------------------------------------------------//

/**** mayBeMovedTo ****/

  mayBeMovedTo (outerItem:SDS_Item, InsertionIndex?:number):boolean {
    if (outerItem == null) throw new SDS_Error('invalid-argument','outerItem must not be missing')
    return this._Store._mayMoveEntryTo(this.Id, outerItem.Id, InsertionIndex)
  }

/**** moveTo ****/

  moveTo (outerItem:SDS_Item, InsertionIndex?:number):void {
    if (outerItem == null) throw new SDS_Error('invalid-argument','outerItem must not be missing')
    this._Store.moveEntryTo(this, outerItem, InsertionIndex)
  }

//----------------------------------------------------------------------------//
//                                   Delete                                   //
//----------------------------------------------------------------------------//

/**** mayBeDeleted ****/

  get mayBeDeleted ():boolean {
    return this._Store._mayDeleteEntry(this.Id)
  }

/**** delete ****/

  delete ():void { this._Store.deleteEntry(this) }

/**** purge ****/

  purge ():void  { this._Store.purgeEntry(this) }

//----------------------------------------------------------------------------//
//                               Serialisation                                //
//----------------------------------------------------------------------------//

/**** asJSON — serialise this entry and its subtree as a plain JSON object ****/

  asJSON ():SDS_EntryJSON { return this._Store._EntryAsJSON(this.Id) }

/**** asBinary — serialise this entry and its subtree as a gzip-compressed binary ****/

  asBinary ():Uint8Array { return this._Store._EntryAsBinary(this.Id) }
}
