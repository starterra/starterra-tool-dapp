import { useWallet } from '@terra-money/wallet-provider'
import React, { ReactNode } from 'react'
import { Button, IconButton, withStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

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
  open: boolean
  handleClose: () => void
}

type ConnectOption = { label: string; icon?: ReactNode; onClick: () => void }

const ConnectWalletOptionList = ({
  open,
  handleClose
}: IConnectWalletOptionListProps) => {
  const { availableConnections, availableInstallations, connect } = useWallet()

  const connectOptions: ConnectOption[] = []

  availableConnections.forEach((connectType) => {
    connectOptions.unshift({
      label: connectType.name,
      icon: <img src={connectType.icon} height='24' />,
      onClick: () => connect(connectType.type, connectType.identifier)
    })
  })

  availableInstallations.forEach((installType) => {
    connectOptions.unshift({
      label: `Install ${installType.name}`,
      icon: <img src={installType.icon} height='24' />,
      onClick: () => window.open(installType.url, '_blank')
    })
  })

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
          {connectOptions.map(({ label, icon, onClick }, key) => (
            <ConnectOptions
              variant='outlined'
              color='secondary'
              onClick={onClick}
              key={key}
              startIcon={icon}
            >
              {label}
            </ConnectOptions>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ConnectWalletOptionList
