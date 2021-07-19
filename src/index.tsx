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
import ConnectWallet from './ConnectWallet'
import {
  NetworkInfo as NetworkInfoIm,
  TxResult as TxResultIm
} from '@terra-dev/wallet-types'
import { Theme } from '@material-ui/core'

import {
  TokenBalance as TokenBalanceIm,
  Tokens as TokensIm
} from './types/token'

import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2043b5'
      // main: '#ffee00'
    },
    secondary: {
      // main: '#0044ff'
      main: '#ffffff'
    },
    info: {
      main: '#10161e', // ciemniejszy
      dark: '#19202b' // jasniejszy
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
      contained: {
        '&.Mui-disabled': {
          color: '#ffee00',
          opacity: 0.5
        }
      },
      containedPrimary: {
        height: '34px',
        borderRadius: '21px',
        fontSize: '13px',
        textTransform: 'initial',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#ffee00'
        }
      },
      outlinedPrimary: {
        border: '4px solid #ffee00',
        borderRadius: '21px',
        '&:hover': {
          border: '4px solid #ffee00'
        }
      },
      outlinedSecondary: {
        borderRadius: '21px',
        marginBottom: '15px',
        backgroundColor: '#10161e',
        textTransform: 'initial',
        border: 'none',
        '&:hover': {
          border: 'none',
          backgroundColor: '#ffee00',
          color: '#10161e'
        }
      }
    },

    MuiInputBase: {
      input: {
        backgroundColor: '#19202b',
        color: '#ffffff',
        border: '3px solid #ffee00'
      }
    },
    MuiFormLabel: {
      root: {
        color: '#ffffff'
      }
    }
  }
})

export interface IWalletProps {
  tokens: Tokens
  readOnlyMode: boolean
  customTheme?: Theme
}
export const Wallet = ({ tokens, readOnlyMode, customTheme }: IWalletProps) => (
  <ThemeProvider theme={customTheme || theme}>
    <ConnectWallet tokens={tokens} readOnlyMode={readOnlyMode} />
  </ThemeProvider>
)

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
