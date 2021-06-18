import { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@terra-money/wallet-provider'
import { avaliableNetworks } from '../avaliableNetworks'
import useAddress from '../hooks/useAddress'
import { tokenValue } from '../utils'
import useBankBalances from '../graphql/useBankBalance'

const DATA_MAPPING: { [key: string]: string } = {
  uusd: 'UST',
  uluna: 'Luna'
}

export interface TokenBalanceResponse {
  denom: string
  amount: string
}

export interface TokenBalance {
  denom: string
  amount: number
}

const DEFAULT_DECIMAL = 6
const useBalance = () => {
  const { network } = useWallet()
  const address = useAddress()
  const [balance, setBalance] = useState<TokenBalance[] | []>([])
  const currentNetwork = avaliableNetworks[network.name]
  const url = `${currentNetwork?.lcd}/bank/balances/${address}`
  const bankBalance = useBankBalances(address)
  console.log(bankBalance);

  const fetchBalance = useCallback(() => {
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const result = data.result
        const mappedResult: TokenBalance[] = result.map(
          (item: TokenBalanceResponse) => {
            return {
              denom: DATA_MAPPING[item.denom],
              amount: tokenValue(+item.amount, DEFAULT_DECIMAL)
            }
          }
        )
        setBalance(mappedResult)
      })
  }, [url])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return { balance }
}
export default useBalance
