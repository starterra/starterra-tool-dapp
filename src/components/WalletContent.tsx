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
import CloseIcon from '@material-ui/icons/Close'
import { useMediaQuery } from 'react-responsive'

const DisconnectButton = withStyles((theme: Theme) => ({
  root: {
    border: 'none',
    width: '100%',
    height: '36px',
    borderRadius: '0px 0px 21px 21px',
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
  close: () => void
}

const WalletContent: FC<WalletContentProps> = ({
  address,
  disconnect,
  finderLink,
  assets,
  close
}) => {
  const [isCopied, setCopied] = useClipboard(address, {
    successDuration: 10000
  })
  const isMobile = useMediaQuery({ maxWidth: 850 })

  return (
    <Paper elevation={3} className='wallet-content'>
      <div className='wallet-section'>
        {isMobile && (
          <div className='wallet-section-close'>
            <IconButton onClick={close} color='secondary' size='small'>
              <CloseIcon />
            </IconButton>
          </div>
        )}
        <div className='wallet-header'>
          <div data-testid='address'>{getEllipsisTxt(address, 9)}</div>
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
        {assets?.length ? (
          <SendDialog wallletAddress={address} tokensBalance={assets} />
        ) : null}
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
