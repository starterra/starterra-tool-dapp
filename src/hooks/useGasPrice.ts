import { useWallet } from '@terra-money/wallet-provider'
import { gasSettings } from '../config'
import { useCallback, useEffect, useState } from 'react'

export const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState('0.456')
  const { network } = useWallet()

  const fetchGasPrice = useCallback(async () => {
    try {
      fetch(gasSettings[network.name].PRICE_ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
          if (data.uusd) {
            setGasPrice(data.uusd)
          }
        })
    } catch (error) {
      console.error(`FCD request faild : ${error}`)
    }
  }, [network.name])

  useEffect(() => {
    fetchGasPrice()
  }, [fetchGasPrice])

  return { gasPrice, fetchGasPrice }
}
