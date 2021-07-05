# starterra-tool-dapp

> Easy to use library to connect with Terra wallet in custom dApp.

## Vision
Our vision is to extend [wallet provider](https://github.com/terra-money/wallet-provider) library with ready to use react component. 

![Wallet component](/assets/images/walletComponent.png)

## Features

-  Connect/Disconnect using different providers (web extension or mobile)
-  Display balance of provided tokens, both native and cw20
-  Token transfer functionality
-  Link to Terra Finder
-  Possibilty to turn on read only mode 

[![NPM](https://img.shields.io/npm/v/starterra-tool-dapp.svg)](https://www.npmjs.com/package/starterra-tool-dapp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @material-ui/core react-router-dom styled-components
npm install --save starterra-tool-dapp
```

## Usage

```tsx
import React, { Component } from 'react'
import { WalletProvider, Wallet } from 'starterra-tool-dapp'

class Example extends Component {
  0: {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev'
  },
  1: {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev'
  }
}

const testnetTokens:Tokens= 
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
    address:'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc',
    name: 'ANC',
    isDefault: false,
    decimal: 6
  }
]
    return (
    <WalletProvider
      defaultNetwork={avaliableNetworks[0]}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet tokens={testnetTokens} readOnlyMode={false}/>
    </WalletProvider>
    )
  }
}
```

### Using wallet provider

You can use all hooks and functions provided by wallet-provider

```tsx
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

```

Just remeber to make this child compoment of WalletProvider

```tsx
const App = () => {
  return (
    <WalletProvider
      defaultNetwork={avaliableNetworks[0]}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet tokens={testnetTokens} readOnlyMode={false}/>
      <Sample/>
    </WalletProvider>
  )
}
```

### Sample mainnet list
```tsx
const mainnetTokens: Tokens = [
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
    address: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
    name: 'MIR',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
    name: 'ANC',
    isDefault: false,
    decimal: 6
  }
]
```

## Custom styling
If you want to use default styling to build upon it, you can import styles by using:

import 'starterra-tool-dapp/dist/index.css'

## License

MIT © [StarTerra devs](https://github.com/StarTerra devs)

# StarTerra Tool for dApps

Powered by [Terra](https://www.terra.money/) blockchain.

## What is it?

Open source library, available through node package manager (NPM), written in TypeScript ready to download and include in your own project.

## What you need it for?

Software to authenticate by address from the [Terra](https://www.terra.money/) blockchain using one of the supported provider:

- Terra Station browser extension (Chrome),
- the Terra Station mobile application.

### Credits

[StarTerra](https://starterra.io/) almighty team.
