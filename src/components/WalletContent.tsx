import React, { FC } from 'react'
import useClipboard from 'react-use-clipboard'
import { Button, Paper, IconButton } from '@material-ui/core'
import { NetworkInfo } from '@terra-dev/wallet-types'
import { getEllipsisTxt } from '../utils'
import LaunchIcon from '@material-ui/icons/Launch'
import FilterNone from '@material-ui/icons/FilterNone'
import SendDialog from './SendDialog'
import * as trans from '../translation'
import Balance from './Balance'
import { TokenBalance } from '../types/token'
import useStyles from '../styles/useStyles'

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
  const classes = useStyles()
  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.section}>
        <div className={classes.header}>
        <p data-testid="address">{getEllipsisTxt(address,9)}</p>
        <IconButton
          aria-label='copy'
          color={isCopied ? 'secondary':'primary'}
          onClick={setCopied}
          size="small"
        >
          <FilterNone fontSize="small"/>
        </IconButton>
        </div>
        <Balance tokenBalance={assets}></Balance>
        <SendDialog wallletAddress={address} tokensBalance={assets} />
        <Button
          color='primary'
          startIcon={<LaunchIcon />}
          className={classes.button}
          href={finderLink}
          target='_balank'
        >
          {trans.VIEW_ON_TERRA_TXT}
        </Button>
      </div>
      <Button
        variant='outlined'
        className={classes.disconnect}
        onClick={disconnect}
        color='primary'
      >
        {trans.DISCONNECT_TXT}
      </Button>
    </Paper>
  )
}

export default WalletContent
