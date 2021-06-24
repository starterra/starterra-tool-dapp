import { NetworkInfo } from '@terra-money/wallet-provider'


export interface ExtendedNetworkInfo{
  mantle: string
}

type WalletNetworkInfo = NetworkInfo & ExtendedNetworkInfo

export const avaliableNetworks: Record<string, WalletNetworkInfo> = {
  mainnet: {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev',
    mantle:'https://mantle.terra.dev/'
  },
  testnet: {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev',
    mantle:'https://tequila-mantle.terra.dev/'
  }
}

export const TERRA_FINDER = 'https://finder.terra.money'
