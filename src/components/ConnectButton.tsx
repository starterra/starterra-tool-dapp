import React, { FC } from 'react'

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { useMediaQuery } from 'react-responsive'

interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton: FC<ConnectButtonProps> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })
  const { onClick, children } = props
  return isMobile ? (
    <IconButton
      aria-label='connet'
      className='wallet-connect-button'
      color='primary'
      onClick={onClick}
    >
      <AccountBalanceWalletIcon />
    </IconButton>
  ) : (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      data-testid='connect-button'
      className='wallet-connect-button'
    >
      {children}
    </Button>
  )
}

export default ConnectButton
