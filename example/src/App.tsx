import React from 'react'

import { WalletProvider, Wallet } from 'starterra-tool-dapp'
import { avaliableNetworks } from './avaliableNetworks'
import 'starterra-tool-dapp/dist/index.css'

const tokens = {
  uluna: {
    name: 'LUNA',
    isDefault: false,
    decimal: 6
  },
  uusd: {
    name: 'UST',
    isDefault: true,
    decimal: 6
  },
  terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6: {
    name: 'MIR',
    isDefault: false,
    decimal: 6
  },
  terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76: {
    name: 'ANC',
    isDefault: false,
    decimal: 6
  }
}


const App = () => {
  return (
    <WalletProvider
      defaultNetwork={avaliableNetworks['testnet']}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet tokens={tokens}/>
    </WalletProvider>
  )
}

export default App
