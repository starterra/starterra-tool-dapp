import 'starterra-tool-dapp/dist/index.css'

import {
  NetworkInfo,
  Tokens,
  Wallet,
  WalletProvider
} from 'starterra-tool-dapp'

import React from 'react'
import Sample from './Sample'

const avaliableNetworks: Record<string, NetworkInfo> = {
  0: {
    name: 'testnet',
    chainID: 'bombay-12',
    lcd: 'https://bombay-lcd.terra.dev'
  },
  1: {
    name: 'mainnet',
    chainID: 'columbus-5',
    lcd: 'https://lcd.terra.dev'
  },
}

const testnetTokens: Tokens = [
  {
    address: 'uluna',
    name: 'LUNA',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'uusd',
    name: 'UST',
    isDefault: true,
    decimal: 6
  },
  {
    address: 'ukrw',
    name: 'KRW',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'usdr',
    name: 'SDR',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u',
    name: 'MIR',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc',
    name: 'ANC',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'terra1yj6ddycyduzgw53klnlk06mm735wd02r5239mg',
    name: 'STT',
    isDefault: false,
    decimal: 6
  }
]

// const mainnetTokens: Tokens = [
//   {
//     address: 'uluna',
//     name: 'LUNA',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'uusd',
//     name: 'UST',
//     isDefault: true,
//     decimal: 6
//   },
//   {
//     address: 'ukrw',
//     name: 'KRW',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'usdr',
//     name: 'SDR',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
//     name: 'MIR',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
//     name: 'ANC',
//     isDefault: false,
//     decimal: 6
//   }
// ]

const App = () => {
  return (
    <WalletProvider
      defaultNetwork={avaliableNetworks[0]}
      walletConnectChainIds={avaliableNetworks}  >
      <Wallet tokens={testnetTokens} readOnlyMode={false}  />
      <Sample />
    </WalletProvider>
  )
}

export default App
