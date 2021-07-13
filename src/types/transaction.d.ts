import {
    UserDenied,
    CreateTxFailed,
    TxFailed,
    TxUnspecifiedError
  } from '@terra-money/wallet-provider'

export type TxError =
  | UserDenied
  | CreateTxFailed
  | TxFailed
  | TxUnspecifiedError
