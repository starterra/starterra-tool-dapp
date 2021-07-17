import { LCDClient } from '@terra-money/terra.js'
import { useWallet } from '@starterra/starterra-tool-dapp'

export const useTerra = (): LCDClient => {
  const { network } = useWallet()

  return new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
    gasPrices: { uusd: 0.15 }
  })
}
