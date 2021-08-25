import { LCDClient } from '@terra-money/terra.js'
import { useWallet } from '@terra-money/wallet-provider'
import { useGasPrice } from './useGasPrice'

export const useTerra = (): LCDClient => {
  const { network } = useWallet()
  const { gasPrice } = useGasPrice()

  return new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
    gasPrices: { uusd: gasPrice }
  })
}
