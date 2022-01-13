import * as trans from '../translation'

import {
  AccAddress,
  Coin,
  Coins,
  CreateTxOptions,
  MsgExecuteContract,
  MsgSend,
  LCDClient
} from '@terra-money/terra.js'

import { Button, withStyles } from '@material-ui/core'

import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { TokenBalance, Tokens } from '../types/token'
import { TxResult, useWallet } from '@terra-money/wallet-provider'
import { isSmartContract, tokenValueNumber } from '../utils'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Send from '@material-ui/icons/Send'
import Spinner from './Spinner'
import TextField from '@material-ui/core/TextField'
import TransactionResult from './TransactionResult'
import { useGasPrice } from '../hooks/useGasPrice'

const SendButton = withStyles(() => ({
  root: {
    width: '100%',
    textTransform: 'initial',
    height: '42px',
    transition: 'all 0.5s',
    '&:hover > span > span': {
      opacity: 1,
      left: '25px'
    }
  },
  startIcon: {
    opacity: 0,
    left: '5px',
    transition: '0.5s',
    position: 'absolute'
  }
}))(Button)

interface SendProps {
  walletAddress: string
  tokensBalance: Tokens
}

const SendDialog: FC<SendProps> = ({ walletAddress, tokensBalance }) => {
<<<<<<< HEAD
  const { post, network } = useWallet()
=======
  const { post } = useWallet()
>>>>>>> origin/main

  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>(1)
  const [token, setToken] = useState<string>('uusd')
  const [memo, setMemo] = useState<string>('')
  const [pending, setPending] = useState(false)
  const [response, setResponse] = useState<TxResult>()
  const [txError, setTxError] = useState<any>()
  const { gasPrice } = useGasPrice()

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

  const send = async () => {
    try {
      const decimal = tokensBalance.find((t) => t.address === token)?.decimal
      const txAmount = amount && amount * Math.pow(10, decimal || 6)
      const msg = [
        isSmartContract(token)
          ? new MsgExecuteContract(walletAddress, token, {
              transfer: {
                recipient: address,
                amount: txAmount.toString()
              }
            })
          : new MsgSend(walletAddress, address, [
              new Coin(token, txAmount.toString())
            ])
      ]
      const terra = new LCDClient({
        URL: network.lcd,
        chainID: network.chainID
      })

      const txOptions: CreateTxOptions = {
        msgs: msg,
        memo: memo,
        gasPrices: new Coins([new Coin('uusd', gasPrice)]),
        feeDenoms: ['uusd']
      }

      const signMsg = await terra.tx.create(
        [{ address: walletAddress }],
        txOptions
      )
      txOptions.fee = signMsg.auth_info.fee
      const response = await post(txOptions)
      setResponse(response)
    } catch (error) {
      setTxError(error)
      setPending(false)
    }
  }

  const DECIMAL_REGEXP = new RegExp(/^\d+(\.\d{0,6})?$/)
  const showStatus = txError || response || pending

  return (
    <div>
      <SendButton
        variant='contained'
        startIcon={<Send />}
        color='primary'
        onClick={handleClickOpen}
      >
        {trans.SEND_TXT}
      </SendButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'
      >
        {showStatus ? (
          <React.Fragment>
            <DialogTitle id='form-dialog-title'>Status</DialogTitle>

            <DialogContent>
              {pending && <Spinner />}
              <TransactionResult
                response={response}
                error={txError}
                setPending={setPending}
              />
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
                  variant='filled'
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
                  variant='filled'
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
                  variant='filled'
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
