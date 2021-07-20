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

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2043b5'
    },
    secondary: {
      main: '#0044ff'
    },
    info: {
      main: '#e8eaed',
      dark: '#ffffff'
    }
  }
})

const theme = createMuiTheme(
  {
    overrides: {
      MuiPaper: {
        root: {
          color: globalTheme.palette.secondary.main,
          backgroundColor: globalTheme.palette.info.dark,
          border: `3px solid ${globalTheme.palette.primary.main}`
        },
        rounded: {
          borderRadius: '20px'
        }
      },
      MuiButton: {
        contained: {
          '&.Mui-disabled': {
            color: globalTheme.palette.primary.main,
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
            backgroundColor: globalTheme.palette.primary.main
          }
        },
        outlinedPrimary: {
          border: `4px solid ${globalTheme.palette.primary.main}`,
          borderRadius: '21px',
          '&:hover': {
            border: `4px solid ${globalTheme.palette.primary.main}`
          }
        },
        outlinedSecondary: {
          borderRadius: '21px',
          marginBottom: '15px',
          backgroundColor: globalTheme.palette.info.main,
          textTransform: 'initial',
          border: 'none',
          '&:hover': {
            border: 'none',
            backgroundColor: globalTheme.palette.primary.main,
            color: globalTheme.palette.info.main
          }
        }
      },

      MuiInputBase: {
        input: {
          backgroundColor: globalTheme.palette.info.dark,
          color: globalTheme.palette.secondary.main,
          border: `3px solid ${globalTheme.palette.primary.main}`
        }
      },
      MuiFormLabel: {
        root: {
          color: globalTheme.palette.secondary.main
        }
      }
    }
  },
  globalTheme
)

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
