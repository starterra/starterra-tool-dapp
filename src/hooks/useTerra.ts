import { LCDClient } from '@terra-money/terra.js'
import { useWallet } from '@terra-money/wallet-provider'

export const useTerra = (): LCDClient => {
  const { network } = useWallet()

  return new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
    gasPrices: { uusd: 0.15 }
  })
}
