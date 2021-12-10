import React, { FC, useState } from 'react'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { getEllipsisTxt } from '../utils'
import { TokenBalance } from '../types/token'
import { tokenValueTxt } from '../utils'
import { useMediaQuery } from 'react-responsive'
import IconButton from './IconButton'

interface ConnectButtonProps {
  address: string
  defaultToken: TokenBalance
  open: boolean
  onClick?: () => void
}

const ConnectedButton: FC<ConnectButtonProps> = ({
  address,
  onClick,
  defaultToken,
  open
}) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })
  const [hover, setHover] = useState(false)
  return open ? (
    <button
      className='outlined wallet-connect-button button-connected-active'
      color='primary'
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      data-testid='connected-button'
    >
      <span className='button-start-icon'>
        <AccountBalanceWalletIcon style={{ fontSize: 15 }} />
      </span>
      {!isMobile && (
        <span className='wallet-connect-address'>
          {getEllipsisTxt(address)}
        </span>
      )}
      {defaultToken && (
        <span className='wallet-balance-button'>
          {tokenValueTxt(defaultToken)}
        </span>
      )}
    </button>
  ) : isMobile ? (
    <IconButton
      aria-label='connet'
      className='wallet-connect-button'
      color='primary'
      onClick={onClick}
    >
      <AccountBalanceWalletIcon />
    </IconButton>
  ) : (
    <button
      className='outlined wallet-connect-button button-connected'
      color='primary'
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      data-testid='connected-button'
    >
      <span className='button-start-icon'>
        <AccountBalanceWalletIcon style={{ fontSize: 15 }} />
      </span>
      {hover ? (
        <span className='wallet-connect-address'>
          {getEllipsisTxt(address)}
        </span>
      ) : (
        <span className='wallet-connect-address'>
          {getEllipsisTxt(address)}
        </span>
      )}
      {defaultToken && (
        <span className='wallet-balance-button'>
          {tokenValueTxt(defaultToken)}
        </span>
      )}
    </button>
  )
}

export default ConnectedButton
