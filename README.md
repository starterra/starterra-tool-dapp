# starterra-tool-dapp

> Library for easy use of Terra wallet in custom dApp

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
  const avaliableNetworks: Record<string, NetworkInfo> = {
  mainnet: {
    name: "mainnet",
    chainID: "columbus-4",
    lcd: "https://lcd.terra.dev",
  },
  testnet: {
    name: "testnet",
    chainID: "tequila-0004",
    lcd: "https://tequila-lcd.terra.dev",
  },
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
    address:'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc',
    name: 'ANC',
    isDefault: false,
    decimal: 6
  }
]

    return (
    <WalletProvider
      defaultNetwork={avaliableNetworks['testnet']}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet tokens={testnetTokens}/>
    </WalletProvider>
    )
  }
}
```

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
