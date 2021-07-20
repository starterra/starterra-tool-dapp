import React, { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles, Theme } from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { getEllipsisTxt } from '../utils'
import { TokenBalance } from '../types/token'
import { tokenValueTxt } from '../utils'
import { useMediaQuery } from 'react-responsive'

const Connected = withStyles((theme: Theme) => ({
  root: {
    textTransform: 'uppercase',
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.main
    }
  }
}))(Button)

const ConnectedActive = withStyles((theme: Theme) => ({
  root: {
    textTransform: 'uppercase',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.main
    }
  }
}))(Button)

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
    <ConnectedActive
      variant='outlined'
      color='primary'
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      data-testid='connected-button'
      className='wallet-connect-button'
      startIcon={<AccountBalanceWalletIcon style={{ fontSize: 15 }} />}
    >
      {!isMobile && <span>{getEllipsisTxt(address)}</span>}
      {defaultToken && (
        <span className='wallet-balance-button'>
          {tokenValueTxt(defaultToken)}
        </span>
      )}
    </ConnectedActive>
  ) : (
    <Connected
      variant='outlined'
      color='primary'
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      data-testid='connected-button'
      className='wallet-connect-button'
      startIcon={<AccountBalanceWalletIcon style={{ fontSize: 15 }} />}
    >
      {!isMobile && hover ? (
        <span>{getEllipsisTxt(address)}</span>
      ) : (
        <span className='wallet-connect-addess'>{getEllipsisTxt(address)}</span>
      )}
      {defaultToken && (
        <span className='wallet-balance-button'>
          {tokenValueTxt(defaultToken)}
        </span>
      )}
    </Connected>
  )
}

export default ConnectedButton
