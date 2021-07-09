import React, { FC, useState, ChangeEvent, useMemo } from 'react'
import Send from '@material-ui/icons/Send'
import {
  MsgSend,
  CreateTxOptions,
  Coin,
  MsgExecuteContract
} from '@terra-money/terra.js'
import { useWallet } from '@terra-money/wallet-provider'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { AccAddress, StdFee, LCDClient } from '@terra-money/terra.js'
import {
  TxResult,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError
} from '@terra-money/wallet-provider'
import TxHashLink from './TxHaskLink'
import * as trans from '../translation'
import Spinner from './Spinner'
import { TokenBalance, Tokens } from '../types/token'
import { tokenValueNumber } from '../utils'

export type TxError =
  | UserDenied
  | CreateTxFailed
  | TxFailed
  | TxUnspecifiedError

const GAS_ADJUSTMENT = 1.6
const GAS = 1000000
const GAS_AMOUNT = '250000uusd'

interface SendProps {
  wallletAddress: string
  tokensBalance: Tokens
}

const isSmartContract = (address: string) => address.startsWith('terra')

const SendDialog: FC<SendProps> = ({ wallletAddress, tokensBalance }) => {
  const { network } = useWallet()
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>(1)
  const [token, setToken] = useState<string>('uusd')
  const [memo, setMemo] = useState<string>('')

  const [pending, setPending] = useState(false)
  const [response, setResponse] = useState<TxResult>()
  const [txError, setTxError] = useState<TxError>()
  const [result, setResult] = useState('') //Enum
  const [resultError, setResultError] = useState<string>('')
  const invalidAddress = useMemo(() => {
    if (address.length === 0) {
      return false
    }
    return !AccAddress.validate(address)
  }, [address])

  const invalidAmount = useMemo(() => {
    if (!amount || amount <= 0) {
      return false
    }
    const tokenBalance: TokenBalance | undefined = tokensBalance.find(
      (t) => t.address === token
    )

    if (!tokenBalance) return false

    const balance: Number = tokenValueNumber(
      tokenBalance.balance,
      tokenBalance.decimal
    )

    return amount ? balance < amount : false
  }, [amount])
  const terra = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID
  })

  const sendDisable = (): boolean => {
    return (
      address.length === 0 || amount === 0 || invalidAmount || invalidAddress
    )
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    setPending(true)
    send()
  }

  const handleCancel = () => {
    setOpen(false)
    resetState()
  }

  const handleTokenChange = (newValue: any) => {
    setToken(newValue)
  }

  const resetState = () => {
    setAddress('')
    setAmount(1)
    setToken('uusd')
    setMemo('')
    setPending(false)
    setResponse(undefined)
    setTxError(undefined)
  }

  const { post } = useWallet()
  const send = async () => {
    try {
      const decimal = tokensBalance.find((t) => t.address === token)?.decimal
      const txAmount = amount && amount * Math.pow(10, decimal || 6)

      const txOptions: CreateTxOptions = {
        msgs: [
          isSmartContract(token)
            ? new MsgExecuteContract(wallletAddress, token, {
                transfer: {
                  recipient: address,
                  amount: txAmount.toString()
                }
              })
            : new MsgSend(wallletAddress, address, [
                new Coin(token, txAmount.toString())
              ])
        ],
        memo: memo,
        gasAdjustment: GAS_ADJUSTMENT,
        fee: new StdFee(GAS, GAS_AMOUNT)
      }
      const response = await post(txOptions)
      console.log(response)
      setResponse(response)

      if (response?.result.txhash) {
        let waiting = true
        do {
          terra.tx
            .txInfo(response?.result.txhash)
            .then((resTx) => {
              console.log(resTx)
              waiting = false
              if (resTx.code) {
                setResult('Error')
                setResultError(resTx.raw_log)
                setPending(false)
                console.log('error')
              } else {
                setResult('Success')
                setPending(false)
                console.log('success')
              }
            })
            .catch((error) => {
              // wait jus if it was 404
              console.log(error)
            })
          await new Promise((ok) => setTimeout(() => ok(null), 5000))
        } while (waiting)
      } else {
        console.log(response)
        console.log('Missing tx hash')
        setPending(false)
      }
    } catch (error) {
      setTxError(error)
      setPending(false)
    }
  }

  const DECIMAL_REGEXP = new RegExp(/^\d+(\.\d{0,4})?$/)
  return (
    <div>
      <Button
        variant='contained'
        startIcon={<Send />}
        className={'wallet-button'}
        color='primary'
        onClick={handleClickOpen}
      >
        {trans.SEND_TXT}
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'
      >
        {txError || response || pending ? (
          <React.Fragment>
            <DialogTitle id='form-dialog-title'>Status</DialogTitle>

            <DialogContent>
              <div>
                {pending && <Spinner />}
                {txError?.message}
                {response?.result.txhash && (
                  <TxHashLink txHash={response?.result.txhash} />
                )}
                {result}
                {resultError}
              </div>
            </DialogContent>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogTitle id='form-dialog-title'>Send</DialogTitle>

            <DialogContent>
              <form>
                <FormControl variant='outlined'>
                  <Select
                    native
                    id='select-token'
                    value={token}
                    margin='dense'
                    inputProps={{
                      name: 'token',
                      id: 'token-native-simple'
                    }}
                    onChange={({ target }) => handleTokenChange(target.value)}
                  >
                    {tokensBalance.map((token: TokenBalance) => (
                      <option key={token.address} value={token.address}>
                        {token.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  autoFocus
                  variant='outlined'
                  id='address'
                  label='Send to'
                  placeholder='Terra address'
                  margin='dense'
                  type='text'
                  value={address}
                  helperText={invalidAddress && trans.INVALID_ADDRESS}
                  error={invalidAddress}
                  fullWidth
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    setAddress(target.value)
                  }
                />

                <TextField
                  variant='outlined'
                  id='amount'
                  type='number'
                  margin='dense'
                  label='Amount'
                  fullWidth
                  inputProps={{ pattern: '[0-9.]*' }}
                  error={invalidAmount}
                  helperText={invalidAmount && trans.INVALID_AMOUNT}
                  value={amount}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                    if (DECIMAL_REGEXP.test(target.value)) {
                      setAmount(+target.value)
                    }
                  }}
                />

                <TextField
                  variant='outlined'
                  margin='dense'
                  id='memo'
                  label='Memo (Optional)'
                  type='text'
                  fullWidth
                  value={memo}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    setMemo(target.value)
                  }
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCancel}
                variant='contained'
                color='primary'
              >
                {trans.CALNCEL_TXT}
              </Button>
              <Button
                onClick={handleSubmit}
                color='primary'
                variant='contained'
                startIcon={<Send />}
                disabled={sendDisable()}
              >
                {trans.SEND_TXT}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  )
}

export default SendDialog
