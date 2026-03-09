/*******************************************************************************
*                                                                              *
*                                  SDS_Error                                   *
*                                                                              *
*******************************************************************************/

export class SDS_Error extends Error {
  readonly code:string

  constructor (Code:string, Message:string) {
    super(Message)
    this.code = Code
    this.name = 'SDS_Error'
  }
}
