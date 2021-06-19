import React from 'react'

import { WalletProvider, Wallet } from 'starterra-tool-dapp'
import { avaliableNetworks } from './avaliableNetworks'
import 'starterra-tool-dapp/dist/index.css'

const App = () => {
  return (
    <WalletProvider
      defaultNetwork={avaliableNetworks['testnet']}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet />
    </WalletProvider>
  )
}

export default App
