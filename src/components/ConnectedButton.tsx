import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { getEllipsisTxt } from '../utils'
import { TokenBalance } from '../types/token'
import { tokenValueTxt } from '../utils'
import useStyles from '../styles/useStyles'

interface ConnectButtonProps {
  address: string
  defaultToken: TokenBalance
  onClick?: () => void
}

const ConnectedButton: FC<ConnectButtonProps> = ( { address, onClick, defaultToken } ) => {
  const classes = useStyles()
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      className={classes.connectButton}
      data-testid="connected-button"
      startIcon={<AccountBalanceWalletIcon />}
    >
      <span>{getEllipsisTxt(address)}</span>
      {defaultToken && (
        <span className={classes.buttonBalance}> 
          { tokenValueTxt(defaultToken)}
        </span>
      )}
    </Button>
  )
}

export default ConnectedButton
