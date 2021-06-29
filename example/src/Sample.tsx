import React from 'react'
import { useWallet, useConnectedWallet } from 'starterra-tool-dapp'

const Sample = () => {
  const { network } = useWallet()
  const connectedWallet = useConnectedWallet()

  return (
    <div>
      <p>{network.name}</p>
      <p>{connectedWallet?.terraAddress}</p>
    </div>
  )
}

export default Sample
