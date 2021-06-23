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
import * as trans from '../translation'

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

  const invalidAddress = useMemo(() => {
    if (address.length === 0) {
      return false
    }
    return !AccAddress.validate(address)
  }, [address])

  const invalidAmount = useMemo(() => {
    if (amount <= 0) return false
    const tokenBalance: TokenBalance | undefined = tokensBalance.find(
      (t) => t.address === token
    )

    if (!tokenBalance) return false

    const balance: Number =
      +(tokenBalance.balance ? tokenBalance.balance : 0) /
      Math.pow(10, tokenBalance.decimal)

    return balance < amount
  }, [amount])

  const sendDisable = (): boolean => {
    
      return address.length === 0 || amount === 0 || invalidAmount || invalidAddress
    
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    send()
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleTokenChange = (newValue: any) => {
    setToken(newValue)
  }

  const { post } = useWallet()
  const send = async () => {
    try {
      const msgs = new MsgSend(wallletAddress, address, { token: 1000000 })
      const txOptions: CreateTxOptions = {
        msgs: [msgs],
        memo: memo,
        gasAdjustment: 1.5
      }

      const response = await post(txOptions)
      console.log(response)
    } catch (error) {
      console.log(error)
      alert(error)
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
        <DialogTitle id='form-dialog-title'>Send</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              variant='outlined'
              id='address'
              label='Address'
              margin='dense'
              type='text'
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
              label='Amount'
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
          <Button onClick={handleSubmit} color='primary' disabled={sendDisable()}>
            {trans.SEND_TXT}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SendDialog
