import React, { FC, useState, ChangeEvent, useMemo } from 'react'
import { MsgSend, CreateTxOptions } from '@terra-money/terra.js'
import { useWallet } from '@terra-money/wallet-provider'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { AccAddress } from '@terra-money/terra.js'
import {
  TxResult,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError
} from '@terra-money/wallet-provider'
import TxHashLink from './TxHaskLink'
import * as trans from '../translation'

export type TxError =
  | UserDenied
  | CreateTxFailed
  | TxFailed
  | TxUnspecifiedError

const GAS_ADJUSTMENT = 1.5
// Will be removed after merging balance ///
interface TokenBalance {
  address: string
  name: string
  isDefault: boolean
  balance?: string
  decimal: number
}

const tokensBalance: TokenBalance[] = [
  {
    address: 'uluna',
    name: 'LUNA',
    isDefault: false,
    decimal: 6,
    balance: '100000000'
  },
  {
    address: 'uusd',
    name: 'UST',
    isDefault: true,
    decimal: 6,
    balance: '100000000'
  },
  {
    address: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
    name: 'MIR',
    isDefault: false,
    decimal: 6,
    balance: '100000000'
  },
  {
    address: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
    name: 'ANC',
    isDefault: false,
    decimal: 6,
    balance: '100000000'
  }
]
interface SendProps {
  wallletAddress: string
}
const SendDialog: FC<SendProps> = ({ wallletAddress }) => {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>(1)
  const [token, setToken] = useState<string>('uusd')
  const [memo, setMemo] = useState<string>('')

  const [pending, setPending] = useState(false)
  const [response, setResponse] = useState<TxResult>()
  const [error, setError] = useState<TxError>()

  const invalidAddress = useMemo(() => {
    if (address.length === 0) {
      return false
    }
    return !AccAddress.validate(address)
  }, [address])

  const invalidAmount = useMemo(() => {
    if (amount && amount <= 0) return false
    const tokenBalance: TokenBalance | undefined = tokensBalance.find(
      (t) => t.address === token
    )

    if (!tokenBalance) return false

    const balance: Number =
      +(tokenBalance.balance ? tokenBalance.balance : 0) /
      Math.pow(10, tokenBalance.decimal)

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

  const resetState = () =>{
    setAddress('')
    setAmount(1)
    setToken('uusd')
    setMemo('')
    setPending(false)
    setResponse(undefined)
    setError(undefined)
  }

  const { post } = useWallet()
  const send = async () => {
    try {
      const decimal = tokensBalance.find((t) => t.address === token)?.decimal
      const txAmount = amount! * Math.pow(10, decimal || 6)
      const msgs = new MsgSend(wallletAddress, address, txAmount + token)
      const txOptions: CreateTxOptions = {
        msgs: [msgs],
        memo: memo,
        gasAdjustment: GAS_ADJUSTMENT
      }

      const response = await post(txOptions)
      setResponse(response)
      console.log(response)
      setPending(false)
    } catch (error) {
      setError(error)
      setPending(false)
    }
  }

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        {trans.SEND_TXT}
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'
      >
        {error || response || pending ? (
          <React.Fragment>
            <DialogTitle id='form-dialog-title'>Status</DialogTitle>

            <DialogContent>
              <div>
                {pending && <div>waiting</div>}
                {error?.message}
                {response?.result.txhash && (
                  <TxHashLink txHash={response?.result.txhash} />
                )}
              </div>
            </DialogContent>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogTitle id='form-dialog-title'>Send</DialogTitle>

            <DialogContent>
              <form>
                <TextField
                  autoFocus
                  variant='outlined'
                  id='address'
                  label='Send to'
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
                  variant='outlined'
                  id='amount'
                  type='number'
                  margin='dense'
                  error={invalidAmount}
                  helperText={invalidAmount && trans.INVALID_AMOUNT}
                  value={amount}
                  onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                    setAmount(+target.value)
                  }
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
              <Button onClick={handleCancel} color='secondary'>
                {trans.CALNCEL_TXT}
              </Button>
              <Button
                onClick={handleSubmit}
                color='primary'
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
