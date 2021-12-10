import React, { FC } from 'react'

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { useMediaQuery } from 'react-responsive'
import IconButton from './IconButton'

interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton: FC<ConnectButtonProps> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })
  const { onClick, children } = props
  return isMobile ? (
    <IconButton
      aria-label='connet'
      className='icon-button wallet-connect-button'
      onClick={onClick}
    >
      <AccountBalanceWalletIcon />
    </IconButton>
  ) : (
    <button
      className='wallet-connect-button'
      onClick={onClick}
      data-testid='connect-button'
    >
      {children}
    </button>
  )
}

export default ConnectButton
