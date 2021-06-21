import * as React from 'react'
import ConnectWallet from './ConnectWallet'
import { TokenBalance, Tokens } from './types/token'
import {
  WalletStatus,
  ConnectType,
  WalletInfo,
  WalletControllerOptions,
  WalletController,
  StringifiedTxResult,
  findTxResult,
  WalletProvider,
  ExtensionNetworkOnlyWalletProvider
} from '@terra-money/wallet-provider'
import {
  useConnectedWallet,
  useWallet,
  useRouterWalletStatusRecheck,
  useInstallChromeExtension
} from '@terra-money/wallet-provider'
import { NetworkInfo, TxResult } from '@terra-dev/wallet-types'

interface Props {
  tokens: Tokens
}

import ApolloClientComp from './graphql/ApolloClient'


export const Wallet = ({tokens}: Props) => {
  return (
    <ApolloClientComp>
      <ConnectWallet tokens={tokens}/>
    </ApolloClientComp>
  )
}

export {
  WalletStatus,
  ConnectType,
  WalletInfo,
  WalletControllerOptions,
  WalletController,
  StringifiedTxResult,
  findTxResult,
  WalletProvider,
  ExtensionNetworkOnlyWalletProvider
}
export {
  useConnectedWallet,
  useWallet,
  useRouterWalletStatusRecheck,
  useInstallChromeExtension
}
export { NetworkInfo, TxResult }
export { TokenBalance, Tokens }
