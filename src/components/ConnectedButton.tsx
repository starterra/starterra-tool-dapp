import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles, Theme } from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { getEllipsisTxt } from '../utils'
import { TokenBalance } from '../types/token'
import { tokenValueTxt } from '../utils'
import { useMediaQuery } from 'react-responsive'

const Connected = withStyles((theme: Theme) => ({
  root: {
    borderRadius: '20px',
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.main
    }
  }
}))(Button)

interface ConnectButtonProps {
  address: string
  defaultToken: TokenBalance
  onClick?: () => void
}

const ConnectedButton: FC<ConnectButtonProps> = ({
  address,
  onClick,
  defaultToken
}) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })

  return (
    <Connected
      variant='outlined'
      color='primary'
      onClick={onClick}
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
    </Connected>
  )
}

export default ConnectedButton
