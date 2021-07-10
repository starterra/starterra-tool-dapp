import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { getEllipsisTxt } from '../utils'
import { TokenBalance } from '../types/token'
import { tokenValueTxt } from '../utils'

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
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      data-testid='connected-button'
      className={'wallet-connect-button'}
      startIcon={<AccountBalanceWalletIcon />}
    >
      <span>{getEllipsisTxt(address)}</span>
      {defaultToken && (
        <span className={'wallet-balance-button'}>
          {tokenValueTxt(defaultToken)}
        </span>
      )}
    </Button>
  )
}

export default ConnectedButton
