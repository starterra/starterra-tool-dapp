import React, { FC } from 'react'

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import IconButton from '@material-ui/core/IconButton'
import { useMediaQuery } from 'react-responsive'

interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton2: FC<ConnectButtonProps> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })
  const { onClick, children } = props
  return isMobile ? (
    <IconButton
      aria-label='connet'
      className='wallet-connect-button'
      color='secondary'
      onClick={onClick}
    >
      <AccountBalanceWalletIcon />
    </IconButton>
  ) : (
    <button className='wallet-connect-button'> {children}</button>
  )
}

export default ConnectButton2
