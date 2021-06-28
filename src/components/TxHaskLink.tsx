import React, { FC } from 'react'
import { getEllipsisTxt } from '../utils'
import { useWallet } from '@terra-money/wallet-provider'
import { TERRA_FINDER } from '../hooks/useNetwork'
import Link from '@material-ui/core/Link'

interface TxHashProps {
  txHash: string
}

const TxHashLink: FC<TxHashProps> = ({ txHash }) => {
  const { network } = useWallet()

  return (
    <React.Fragment>
      <div>Check on terra finder</div>
      <Link
        href={`${TERRA_FINDER}/${network.chainID}/tx/${txHash}`}
        target='_blank'
      >
        {getEllipsisTxt(txHash)}
      </Link>
    </React.Fragment>
  )
}
export default TxHashLink
