import * as trans from '../translation'

import { Button, IconButton, Paper, Theme, withStyles } from '@material-ui/core'
import React, { FC } from 'react'

import Balance from './Balance'
import FilterNone from '@material-ui/icons/FilterNone'
import LaunchIcon from '@material-ui/icons/Launch'
import { NetworkInfo } from '@terra-dev/wallet-types'
import SendDialog from './SendDialog'
import { TokenBalance } from '../types/token'
import { getEllipsisTxt } from '../utils'
import useClipboard from 'react-use-clipboard'

const DisconnectButton = withStyles((theme: Theme) => ({
  root: {
    border: 'none',
    width: '100%',
    height: '36px',
    borderRadius: '21px',
    textTransform: 'initial',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.main
    }
  }
}))(Button)

interface WalletContentProps {
  address: string
  network: NetworkInfo
  finderLink: string
  assets: TokenBalance[]
  disconnect?: () => void
}

const WalletContent: FC<WalletContentProps> = ({
  address,
  disconnect,
  finderLink,
  assets
}) => {
  const [isCopied, setCopied] = useClipboard(address, {
    successDuration: 10000
  })
  return (
    <Paper elevation={3} className='wallet-content'>
      <div className='wallet-section'>
        <div className='wallet-header'>
          <p data-testid='address'>{getEllipsisTxt(address, 9)}</p>
          <IconButton
            aria-label='copy'
            color={isCopied ? 'secondary' : 'primary'}
            onClick={setCopied}
            size='small'
          >
            <FilterNone style={{ fontSize: 12 }} />
          </IconButton>
        </div>
        <Balance tokenBalance={assets} />
        <SendDialog wallletAddress={address} tokensBalance={assets} />
        <Button
          color='secondary'
          startIcon={<LaunchIcon color='primary' />}
          className='wallet-button'
          href={finderLink}
          target='_balank'
        >
          {trans.VIEW_ON_TERRA_TXT}
        </Button>
      </div>
      <DisconnectButton variant='outlined' onClick={disconnect}>
        {trans.DISCONNECT_TXT}
      </DisconnectButton>
    </Paper>
  )
}

export default WalletContent
