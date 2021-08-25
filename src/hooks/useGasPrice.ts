import { useWallet } from '@terra-money/wallet-provider'
import { gasSettings } from '../config'
import { useCallback, useEffect, useState } from 'react'

export const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState('0.15')
  const { network } = useWallet()

  const fetchGasPrice = useCallback(async () => {
    fetch(gasSettings[network.name].PRICE_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        if (data.uusd) {
          setGasPrice(data.uusd)
        }
      })
  }, [network.name])

  useEffect(() => {
    fetchGasPrice()
  }, [fetchGasPrice])

  return { gasPrice, fetchGasPrice }
}
