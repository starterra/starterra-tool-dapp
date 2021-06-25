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
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2043b5',
    },
    secondary: {
      main: '#0044ff',
    },
  },
  typography: {
    fontFamily: ['"Gotham"','sans-serif'
    ].join(',')
  },
  overrides: {
    MuiPaper: {
      root: {
        color: '#2043b5',
      },
    },
    MuiButton:{
      containedPrimary:{
        height: '30px',
        borderRadius: '20px',
        fontSize: '12px'
      }
    }
  }
});

interface Props {
  tokens: Tokens
}

export const Wallet = ({ tokens }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <ConnectWallet tokens={tokens} />
    </ThemeProvider>
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
