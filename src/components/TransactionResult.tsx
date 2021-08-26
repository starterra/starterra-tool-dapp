import React, { FC, useCallback, useEffect, useState } from 'react'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { TxError } from '../types/transaction'
import TxHashLink from './TxHaskLink'
import { NetworkInfo, TxResult } from '@terra-money/wallet-provider'
import { green } from '@material-ui/core/colors'
import { useTerra } from '../hooks/useTerra'

enum TxFinalResult {
  None,
  Success,
  Error
}

interface TxResultProps {
  response?: TxResult
  error?: TxError
  network: NetworkInfo
  setPending: (value: boolean) => void
}

const TransactionResult: FC<TxResultProps> = ({
  response,
  error,
  network,
  setPending
}) => {
  const terra = useTerra(network.lcd)
  const [result, setResult] = useState<TxFinalResult>(TxFinalResult.None)
  const [resultError, setResultError] = useState<string>('')

  const txhash = response?.result.txhash ?? ''

  const getTxStatus = useCallback(
    async (hash: string) => {
      const txResult = await terra.tx
        .txInfo(hash)
        .then((resTx) => {
          if (resTx.code) {
            setResult(TxFinalResult.Error)
            setResultError(resTx.raw_log)
          } else {
            setResult(TxFinalResult.Success)
          }
          return true
        })
        .catch((txError) => {
          const isNotFound = JSON.stringify(txError).includes('status code 404')
          if (!isNotFound) {
            setResultError(JSON.stringify(txError).substring(0, 40))
            setResult(TxFinalResult.Error)
          }
          return !isNotFound
        })
      setPending(!txResult)
    },
    [setPending, terra.tx]
  )

  useEffect(() => {
    function pool() {
      if (result === TxFinalResult.None && txhash) {
        getTxStatus(txhash)
      }
    }
    const id = setInterval(pool, 4000)
    return () => clearInterval(id)
  }, [error, txhash, result, getTxStatus])
  return (
    <div>
      {result === TxFinalResult.Success && (
        <CheckCircleOutlineIcon
          fontSize='large'
          style={{ color: green[500] }}
        />
      )}
      {(result === TxFinalResult.Error || error) && (
        <ErrorOutlineIcon fontSize='large' color='error' />
      )}

      {error?.message}
      {resultError}
      {txhash && <TxHashLink txHash={txhash} />}
    </div>
  )
}

export default TransactionResult
