import {
    NetworkInfo
  } from 'starterra-tool-dapp'


export const avaliableNetworks: Record<string, NetworkInfo> = {
  0: {
    name: "mainnet",
    chainID: "columbus-5",
    lcd: "https://lcd.terra.dev",
    walletconnectID:2
  },
  1: {
    name: "testnet",
    chainID: "bombay-12",
    lcd: "https://bombay-lcd.terra.dev",
    walletconnectID:1
  },
}
