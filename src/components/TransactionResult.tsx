import React, { FC, useEffect, useState } from 'react'
import { TxError } from '../types/transaction'

import { TxResult, useWallet } from '@terra-money/wallet-provider'
import { LCDClient } from '@terra-money/terra.js'
import TxHashLink from './TxHaskLink'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { green } from '@material-ui/core/colors'

enum TxFinalResult {
  None,
  Success,
  Error
}

interface TxResultProps {
  response?: TxResult
  error?: TxError
  setPending: (value: boolean) => void
}

const TransactionResult: FC<TxResultProps> = ({
  response,
  error,
  setPending
}) => {
  const { network } = useWallet()
  const [result, setResult] = useState<TxFinalResult>(TxFinalResult.None) //Enum
  const [resultError, setResultError] = useState<string>('')

  const txhash = response?.result.txhash ?? ''

  const terra = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID
  })

  useEffect(() => {
    !error && txhash && poolStatus()
  }, [!error, txhash])

  const getTxStatus = async(txhash: string) => {
    const result = await terra.tx
      .txInfo(txhash)
      .then((resTx) => {
        if (resTx.code) {
          setResult(TxFinalResult.Error)
          setResultError(resTx.raw_log)
          setPending(false)
        } else {
          setResult(TxFinalResult.Success)
          setPending(false)
        }
        return true
      })
      .catch((error) => {
        const isNotFound = JSON.stringify(error).includes('status code 404')
        if (!isNotFound) {
          setResultError(JSON.stringify(error).substring(0, 40))
          setResult(TxFinalResult.Error)
          setPending(false)
        }
        return !isNotFound
      })
    return result
  }

  const poolStatus = async () => {
    do {
      await new Promise((ok) => setTimeout(() => ok(null), 4000))
    } while (!getTxStatus(txhash))
  }

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
