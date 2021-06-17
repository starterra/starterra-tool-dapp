import * as React from 'react'
import styles from './styles.module.css'
import ConnectWallet from './ConnectWallet'
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
import {
  NetworkInfo,
  TxResult
} from '@terra-dev/wallet-types'
interface Props {
  text: string
}
import ApolloClientComp from "./components/ApolloClient";

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const Wallet = () => {
  return (<ApolloClientComp><ConnectWallet /></ApolloClientComp>)
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
export {
  NetworkInfo,
  TxResult
}

