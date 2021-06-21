# starterra-tool-dapp

> Library for easy use of Terra wallet in custom dApp

[![NPM](https://img.shields.io/npm/v/starterra-tool-dapp.svg)](https://www.npmjs.com/package/starterra-tool-dapp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save starterra-tool-dapp
```

## Usage

```tsx
import React, { Component } from 'react'

import WalletProvider from 'starterra-tool-dapp'
import 'starterra-tool-dapp/dist/index.css'

class Example extends Component {
  render() {
    return (<WalletProvider
      defaultNetwork={avaliableNetworks["testnet"]}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet />
    </WalletProvider>)
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
