import React, { FC } from 'react'
import { getEllipsisTxt } from '../utils'
import { useWallet } from '@terra-money/wallet-provider'
import { TERRA_FINDER } from '../avaliableNetworks'
import Link from '@material-ui/core/Link'

interface TxHashProps {
  txHash: string
}

const TxHashLink: FC<TxHashProps> = ({ txHash } ) => {
  const { network } = useWallet()

  return (
    <Link
      href={`${TERRA_FINDER}/${network.chainID}/tx/${txHash}`}
      target='_blank'
    >
      {getEllipsisTxt(txHash)}
    </Link>
  )
}
export default TxHashLink
