import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton: FC<ConnectButtonProps> = (props) => {
  const { onClick, children } = props
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      startIcon={<AccountBalanceWalletIcon />}
    >
      {children}
    </Button>
  )
}

export default ConnectButton
