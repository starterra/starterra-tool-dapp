import {
    NetworkInfo
  } from 'starterra-tool-dapp'


export const avaliableNetworks: Record<string, NetworkInfo> = {
  0: {
    name: "mainnet",
    chainID: "columbus-4",
    lcd: "https://lcd.terra.dev",
  },
  1: {
    name: "testnet",
    chainID: "tequila-0004",
    lcd: "https://tequila-lcd.terra.dev",
  },
}
