import 'starterra-tool-dapp/dist/index.css'

import {
  NetworkInfo,
  Tokens,
  Wallet,
  WalletProvider
} from 'starterra-tool-dapp'

import React from 'react'
import Sample from './Sample'
import { createMuiTheme } from '@material-ui/core/styles'

const avaliableNetworks: Record<string, NetworkInfo> = {
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

const testnetTokens: Tokens = [
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
    address: 'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u',
    name: 'MIR',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc',
    name: 'ANC',
    isDefault: false,
    decimal: 6
  },
  {
    address: 'terra1ajzprdl7wsu4k5erd7cg0fus3tnv8l7480lwlm',
    name: 'NTTT',
    isDefault: false,
    decimal: 6
  }
]

// const mainnetTokens: Tokens = [
//   {
//     address: 'uluna',
//     name: 'LUNA',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'uusd',
//     name: 'UST',
//     isDefault: true,
//     decimal: 6
//   },
//   {
//     address: 'ukrw',
//     name: 'KRW',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'usdr',
//     name: 'SDR',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
//     name: 'MIR',
//     isDefault: false,
//     decimal: 6
//   },
//   {
//     address: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
//     name: 'ANC',
//     isDefault: false,
//     decimal: 6
//   }
// ]
const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffee00',
      dark: '#ffff29'
    },
    secondary: {
      main: '#ffffff'
    },
    info: {
      main: '#10161e', // ciemniejszy
      dark: '#19202b' // jasniejszy
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
          border: `6px solid rgba(255,238,0,0.3)`,
          boxShadow: `0px 0px 6px ${globalTheme.palette.primary.dark}, 0 0 0 3px ${globalTheme.palette.primary.main} !important`,
        },
        rounded: {
          borderRadius: '27px',
          // opacity: 0.3
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
const App = () => {
  return (
    <WalletProvider
      defaultNetwork={avaliableNetworks[0]}
      walletConnectChainIds={avaliableNetworks}
    >
      <Wallet tokens={testnetTokens} readOnlyMode={false} customTheme={theme} />
      <Sample />
    </WalletProvider>
  )
}

export default App
