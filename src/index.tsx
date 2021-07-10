import * as React from 'react'
import ConnectWallet, { IConnectWalletProps } from './ConnectWallet'
import {
  TokenBalance as TokenBalanceIm,
  Tokens as TokensIm
} from './types/token'
import {
  WalletStatus,
  ConnectType,
  WalletInfo as WalletInfoIm,
  WalletControllerOptions as WalletControllerOptionsIm,
  WalletController,
  StringifiedTxResult as StringifiedTxResultIm,
  findTxResult,
  WalletProvider,
  ExtensionNetworkOnlyWalletProvider,
  useWallet,
  useConnectedWallet,
  useInstallChromeExtension
} from '@terra-money/wallet-provider'
import {
  NetworkInfo as NetworkInfoIm,
  TxResult as TxResultIm
} from '@terra-dev/wallet-types'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import './styles.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2043b5'
    },
    secondary: {
      main: '#0044ff'
    }
  },
  typography: {
    fontFamily: ['"Gotham"', 'sans-serif', '-apple-system'].join(',')
  },
  overrides: {
    MuiPaper: {
      root: {
        color: '#2043b5'
      }
    },
    MuiButton: {
      containedPrimary: {
        height: '30px',
        borderRadius: '20px',
        fontSize: '12px'
      }
    },
    MuiInputBase: {
      input: {
        color: '#2043b5',
        border: '1px solid rgba(12,54,148,.2)'
      }
    }
  }
})

export const Wallet = ({ tokens, readOnlyMode }: IConnectWalletProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ConnectWallet tokens={tokens} readOnlyMode={readOnlyMode} />
    </ThemeProvider>
  )
}

export type WalletInfo = WalletInfoIm
export type WalletControllerOptions = WalletControllerOptionsIm
export type StringifiedTxResult = StringifiedTxResultIm
export type NetworkInfo = NetworkInfoIm

export type TxResult = TxResultIm
export type TokenBalance = TokenBalanceIm
export type Tokens = TokensIm
export {
  WalletStatus,
  ConnectType,
  WalletController,
  findTxResult,
  WalletProvider,
  ExtensionNetworkOnlyWalletProvider
}
export { useConnectedWallet, useWallet, useInstallChromeExtension }
