import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import useStyles from '../styles/useStyles'
interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton: FC<ConnectButtonProps> = (props) => {
  const { onClick, children  } = props
  const classes = useStyles()
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      className={classes.connectButton}
      startIcon={<AccountBalanceWalletIcon />}
    >
      {children}
    </Button>
  )
}

export default ConnectButton
