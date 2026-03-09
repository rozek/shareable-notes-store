/*******************************************************************************
*                                                                              *
*                                  SDS_Item                                    *
*                                                                              *
*******************************************************************************/

import { z }               from 'zod'
import { SDS_DataStore }   from './SDS_DataStore.js'
import type { SDS_ItemJSON } from './SDS_DataStore.js'
import { SDS_Entry }       from './SDS_Entry.js'
import { SDS_Error }       from '../error/SDS_Error.js'
import { validateMIMEType } from './SDS_Validation.js'

//----------------------------------------------------------------------------//
//                          Zod Validation Schemas                            //
//----------------------------------------------------------------------------//

  const writeValueSchema = z.union(
    [z.string(), z.instanceof(Uint8Array), z.undefined()],
    { invalid_type_error: 'Value must be a string, a Uint8Array, or undefined' },
  )

  const spliceIndexSchema = z.number({
    invalid_type_error: 'index must be a number',
  }).int('index must be an integer').nonnegative('index must be a non-negative integer')

  const ReplacementSchema = z.string({
    invalid_type_error: 'Replacement must be a string',
  })

  function parseOrThrow<T> (Schema:z.ZodType<T>, Value:unknown, context?:string):T {
    const Result = Schema.safeParse(Value)
    if (Result.success) { return Result.data }
    const Msg = (context ? `${context}: ` : '') + (Result.error.issues[0]?.message ?? 'invalid argument')
    throw new SDS_Error('invalid-argument', Msg)
  }

export class SDS_Item extends SDS_Entry {
  constructor (Store:SDS_DataStore, Id:string) {
    super(Store, Id)
  }

//----------------------------------------------------------------------------//
//                               Type & Value                                 //
//----------------------------------------------------------------------------//

/**** Type / ValueKind / isLiteral / isBinary ****/

  get Type ():string     { return this._Store._TypeOf(this.Id) }
  set Type (Type:string) {
    validateMIMEType(Type)
    this._Store._setTypeOf(this.Id, Type)
  }

  get ValueKind ():'none' | 'literal' | 'literal-reference' | 'binary' | 'binary-reference' | 'pending' {
    return this._Store._ValueKindOf(this.Id)
  }

  get isLiteral ():boolean { return this._Store._isLiteralOf(this.Id) }
  get isBinary (): boolean { return this._Store._isBinaryOf(this.Id) }

/**** readValue — resolves inline values immediately, fetches blobs async ****/

  readValue ():Promise<string | Uint8Array | undefined> {
    return this._Store._readValueOf(this.Id)
  }

/**** writeValue — chooses ValueKind automatically based on type/size ****/

  writeValue (Value:string | Uint8Array | undefined):void {
    parseOrThrow(writeValueSchema, Value)
    this._Store._writeValueOf(this.Id, Value)
  }

/**** changeValue — collaborative character-level edit (literal only) ****/

  changeValue (fromIndex:number, toIndex:number, Replacement:string):void {
    parseOrThrow(spliceIndexSchema, fromIndex, 'fromIndex')
    const toIndexResult = spliceIndexSchema.safeParse(toIndex)
    if (! toIndexResult.success || toIndex < fromIndex) {
      throw new SDS_Error('invalid-argument', 'toIndex must be an integer \u2265 fromIndex')
    }
    parseOrThrow(ReplacementSchema, Replacement, 'Replacement')
    this._Store._spliceValueOf(this.Id, fromIndex, toIndex, Replacement)
  }

//----------------------------------------------------------------------------//
//                             Inner Entry List                               //
//----------------------------------------------------------------------------//

/**** innerEntryList ****/

  get innerEntryList ():SDS_Entry[] {
    return this._Store._innerEntriesOf(this.Id)
  }

//----------------------------------------------------------------------------//
//                               Serialisation                                //
//----------------------------------------------------------------------------//

/**** asJSON — serialise this item and its subtree as a plain JSON object ****/

  override asJSON ():SDS_ItemJSON {
    return this._Store._EntryAsJSON(this.Id) as SDS_ItemJSON
  }
}
