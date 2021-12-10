import React, { FC } from 'react'

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { useMediaQuery } from 'react-responsive'

interface ConnectButtonProps {
  onClick?: () => void
}

const ConnectButton2: FC<ConnectButtonProps> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })
  const { onClick, children } = props
  return isMobile ? (
    <button
      aria-label='connet'
      className='icon-button wallet-connect-button'
      color='secondary'
      onClick={onClick}
    >
      <span className='icon-button-label'>
        <AccountBalanceWalletIcon />
      </span>
    </button>
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

export default ConnectButton2
