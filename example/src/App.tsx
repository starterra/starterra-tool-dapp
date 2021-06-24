import React from 'react'

import { WalletProvider, Wallet, Tokens } from 'starterra-tool-dapp'
import { avaliableNetworks } from './avaliableNetworks'
import 'starterra-tool-dapp/dist/index.css'


const tokens:Tokens= 
   [{
    address: 'uluna',
    name: 'LUNA',
    isDefault: false,
    decimal: 6
  },
  {
    address:'uusd',
    name: 'UST',
    isDefault: true,
    decimal: 6
  },
  {
    address:'ukrw',
    name: 'KRW',
    isDefault: false,
    decimal: 6
  },
  {
    address:'usdr',
    name: 'SDR',
    isDefault: false,
    decimal: 6
  },
  {
    address:'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u',
    name: 'MIR',
    isDefault: false,
    decimal: 6
  },
   {
    address:'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
    name: 'ANC',
    isDefault: false,
    decimal: 6
  }
]

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
