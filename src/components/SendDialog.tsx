import * as trans from '../translation'

import {
  AccAddress,
  Coin,
  Coins,
  CreateTxOptions,
  MsgExecuteContract,
  MsgSend
} from '@terra-money/terra.js'

import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { TokenBalance, Tokens } from '../types/token'
import { TxResult, useWallet } from '@terra-money/wallet-provider'
import { isSmartContract, tokenValueNumber } from '../utils'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Send from '@material-ui/icons/Send'
import Spinner from './Spinner'
import TextField from '@material-ui/core/TextField'
import TransactionResult from './TransactionResult'
import { useGasPrice } from '../hooks/useGasPrice'
import Modal from 'react-modal'

interface SendProps {
  walletAddress: string
  tokensBalance: Tokens
}

const SendDialog: FC<SendProps> = ({ walletAddress, tokensBalance }) => {
  const { post } = useWallet()

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
    console.log('handle click open')
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
      const txOptions: CreateTxOptions = {
        msgs: msg,
        memo: memo,
        gasPrices: new Coins([new Coin('uusd', gasPrice)])
      }
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
      <button
        aria-label='send'
        onClick={handleClickOpen}
        className='send-button'
      >
        <span>
          <span className='send-button-icon'>
            <Send style={{ fontSize: 20 }} />
          </span>

          {trans.SEND_TXT}
        </span>
      </button>
      <Modal
        isOpen={open}
        onRequestClose={handleCancel}
        style={{
          content: {
            inset:'200px',
            maxWidth: '600px',
            minHeight: '300px',
            borderRadius: '20px',
            border: '3px solid #2043b5'
          }
        }}
        aria-labelledby='form-dialog-title'
      >
        {showStatus ? (
          <React.Fragment>
            <h3 id='form-dialog-title'>Status</h3>

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
            <h3 id='form-dialog-title'>Send</h3>

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
              <button onClick={handleCancel}>{trans.CALNCEL_TXT}</button>
              <button onClick={handleSubmit} disabled={sendDisable()}>
                <span className='button-start-icon'>
                  <Send style={{ fontSize: 20 }} />
                </span>
                {trans.SEND_TXT}
              </button>
            </DialogActions>
          </React.Fragment>
        )}
      </Modal>
    </div>
  )
}

export default SendDialog
