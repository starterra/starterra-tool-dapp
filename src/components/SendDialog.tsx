import React, { FC, useState, ChangeEvent, useMemo } from 'react'
import { MsgSend, CreateTxOptions } from '@terra-money/terra.js'
import { useWallet } from '@terra-money/wallet-provider'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { AccAddress } from '@terra-money/terra.js'

interface SendProps {
  wallletAddress: string
}
const SendDialog: FC<SendProps> = ({ wallletAddress }) => {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [token, setToken] = useState<string>('UST')
  const [memo, setMemo] = useState<string>('')

  const invalidAddress = useMemo(() => {
    if (address.length === 0) {
      return undefined
    }
    return !AccAddress.validate(address)
  }, [address])

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

  const handleTokenChange = () =>{
     setToken('uusd')
  }

  const { post } = useWallet()
  const send = async () => {
    try {
      const msgs = new MsgSend(
        wallletAddress,
        address,
        { uusd: 1000000 }
      )
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
        Send
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Send</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant='outlined'
            margin='dense'
            id='address'
            label='Address'
            type='text'
            helperText={invalidAddress && "Invalid address."}
            error={invalidAddress}
            fullWidth
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setAddress(target.value)
          }
          />
          <FormControl variant='outlined'>
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              value={token}
              onChange={handleTokenChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>UST</MenuItem>
              <MenuItem value={20}>LUNA</MenuItem>
              <MenuItem value={30}>ANC</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant='outlined'
            margin='dense'
            id='amount'
            label='Amount'
            type='number'
            fullWidth
            value={amount}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setAmount(target.value)
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SendDialog
