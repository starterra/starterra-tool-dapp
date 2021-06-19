import React, { useEffect, useState } from 'react'
import useClipboard from 'react-use-clipboard'
import { Button, Paper, ButtonGroup } from '@material-ui/core'
import { NetworkInfo } from '@terra-dev/wallet-types'
import { getEllipsisTxt } from '../utils'
import LaunchIcon from '@material-ui/icons/Launch'
import Check from '@material-ui/icons/Check'
import * as trans from '../translation'
import useTokenBalance, { TokenBalance } from '../graphql/useTokenBalance'
import useBankBalance from '../graphql/useBankBalance'
import Balance from './Balance'

interface WalletContentProps {
  address: string
  network: NetworkInfo
  finderLink: string
  disconnect?: () => void
}

const WalletContent = (props: WalletContentProps) => {
  const { address, disconnect, finderLink } = props

  const [isCopied, setCopied] = useClipboard(address, {
    successDuration: 10000
  })
  const [assets, setAssets] = useState<TokenBalance[]>([])
  const balance = useTokenBalance(address)
  const bank = useBankBalance(address)
  console.log(balance)
  console.log(bank)

  useEffect(() => {
    console.log(assets);
    if (!balance.loading && !bank.loading  && (bank.list||balance.list)) {
      console.log(bank.list)
      const bankItems = bank.list?{...bank.list}:[]
      const balanceItems = balance.list?{...balance.list}:[]
      setAssets(bankItems.concat(balanceItems));
    }

  }, [balance.loading, bank.loading])
  return (
    <Paper elevation={3}>
      <h3>{getEllipsisTxt(address)}</h3>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='outlined secondary button group'
      >
        <Balance tokenBalance={[]}></Balance>
        <Button
          color='primary'
          variant='outlined'
          onClick={setCopied}
          endIcon={isCopied && <Check />}
        >
          {trans.COPY_TXT}
        </Button>
        <Button color='primary' startIcon={<LaunchIcon />} href={finderLink}>
          {trans.VIEW_ON_TERRA_TXT}
        </Button>
        <Button variant='outlined' onClick={disconnect} color='secondary'>
          {trans.DISCONNECT_TXT}
        </Button>
      </ButtonGroup>
    </Paper>
  )
}

export default WalletContent
