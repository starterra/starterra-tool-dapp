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
    address:'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
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




// key.startsWith('terra'))
// console.log(nativeTokens);

  //return !key.startsWith('terra')?tokens[key]:undefined


//const balanceTokens = Object.entries(tokens).filter(([key])=>key.startsWith('terra'))

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
