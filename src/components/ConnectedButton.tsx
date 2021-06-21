import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { getEllipsisTxt } from '../utils'
import { TokenBalance } from '../graphql/useTokenBalance'
import { tokenValueTxt } from '../utils'

interface ConnectButtonProps {
  address: string
  defaultToken: TokenBalance
  onClick?: () => void
}

const ConnectedButton: FC<ConnectButtonProps> = ( { address, onClick, defaultToken } ) => {
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      startIcon={<AccountBalanceWalletIcon />}
    >
      <span>{getEllipsisTxt(address)}</span>
      {defaultToken && (
        <span>
          {tokenValueTxt(defaultToken)}
        </span>
      )}
    </Button>
  )
}

export default ConnectedButton
