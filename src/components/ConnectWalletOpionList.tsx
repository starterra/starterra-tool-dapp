import { ConnectType, useWallet } from '@terra-money/wallet-provider'
import React, { ReactNode } from 'react'
import { Button, IconButton, withStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { TerraIcon, WalletIcon } from './Icons'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { v4 as uuidv4 } from 'uuid'
import * as trans from '../translation'

const ConnectOptions = withStyles(() => ({
  label: {
    justifyContent: 'left',
    marginLeft: '15px',
    fontWeight: 600
  },
  startIcon: {
    color: '#2043b5',
    marginRight: '20px'
  }
}))(Button)

interface IConnectWalletOptionListProps {
  readOnlyMode: boolean
  open: boolean
  handleClose: () => void
}

type ConnectOption = { label: string; icon?: ReactNode; onClick: () => void }

const ConnectWalletOptionList = ({
  readOnlyMode,
  open,
  handleClose
}: IConnectWalletOptionListProps) => {
  const { availableConnectTypes, availableInstallTypes, connect, install } =
    useWallet()

  console.log(availableInstallTypes)
  const connectOptions: Record<string, ConnectOption> = {}
  if (availableInstallTypes.includes(ConnectType.EXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.INSTALL_TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => install(ConnectType.EXTENSION)
    }
  }
  if (availableConnectTypes.includes(ConnectType.EXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => connect(ConnectType.EXTENSION)
    }
  }
  if (availableConnectTypes.includes(ConnectType.WALLETCONNECT)) {
    connectOptions[uuidv4()] = {
      label: trans.TERRA_MOB_TXT,
      icon: <WalletIcon />,
      onClick: () => connect(ConnectType.WALLETCONNECT)
    }
  }
  if (readOnlyMode && availableConnectTypes.includes(ConnectType.READONLY)) {
    connectOptions[uuidv4()] = {
      label: trans.READ_ONLY_TXT,
      onClick: () => connect(ConnectType.READONLY)
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>
        <IconButton
          onClick={handleClose}
          color='secondary'
          className='wallet-contect-options-title-close'
        >
          <CloseIcon />
        </IconButton>
        <div className='wallet-contect-options-title'>
          Connect
          <span className='wallet-contect-options-title-second'> Wallet</span>
        </div>
      </DialogTitle>

      <DialogContent>
        <div className='wallet-contect-options-content'>
          {Object.entries(connectOptions).map(
            ([key, { label, icon, onClick }]) => (
              <ConnectOptions
                variant='outlined'
                color='secondary'
                onClick={onClick}
                key={key}
                startIcon={icon}
              >
                {label}
              </ConnectOptions>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ConnectWalletOptionList
