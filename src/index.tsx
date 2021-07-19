import './styles.css'

import * as React from 'react'

import {
  ConnectType,
  ExtensionNetworkOnlyWalletProvider,
  StringifiedTxResult as StringifiedTxResultIm,
  WalletController,
  WalletControllerOptions as WalletControllerOptionsIm,
  WalletInfo as WalletInfoIm,
  WalletProvider,
  WalletStatus,
  findTxResult,
  useConnectedWallet,
  useInstallChromeExtension,
  useWallet
} from '@terra-money/wallet-provider'
import ConnectWallet, { IConnectWalletProps } from './ConnectWallet'
import {
  NetworkInfo as NetworkInfoIm,
  TxResult as TxResultIm
} from '@terra-dev/wallet-types'
import {
  TokenBalance as TokenBalanceIm,
  Tokens as TokensIm
} from './types/token'

import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#2043b5'
      main: '#ffee00'
    },
    secondary: {
      // main: '#0044ff'
      main: '#ffffff'
    },
    info: {
      main: '#10161e',
      dark: '#19202b'
    }
  },
  typography: {
    fontFamily: ['"Gotham"', 'sans-serif', '-apple-system'].join(',')
  },
  overrides: {
    MuiPaper: {
      root: {
        color: '#ffffff',
        backgroundColor: '#19202b',
        border: '3px solid rgb(255,230,0)'
      },
      rounded: {
        borderRadius: '20px'
      }
    },
    MuiButton: {
      containedPrimary: {
        height: '34px',
        borderRadius: '21px',
        fontSize: '13px',
        textTransform: 'initial'
      },
      outlinedPrimary: {
        border: '4px solid #ffee00',
        '&:hover': { 
          border: '4px solid #ffee00'
        }
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
