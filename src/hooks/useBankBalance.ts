import { useState, useEffect, useCallback } from 'react'
import { LCDClient, Coin } from '@terra-money/terra.js'
import { Tokens } from '../types/token'

const useBankBalance = (
  address: string,
  contracts: Tokens,
  terraClient: LCDClient
) => {
  const [balance, setBalance] = useState<Tokens>([])

  const fetchBalance = useCallback(async () => {
    if (address) {
     
      const response = await terraClient.bank.balance(address)

      const result: Tokens = response.map((item: Coin) => {
        return {
          ...contracts.find((c) => c.address == item.denom)!,
          balance: item.amount.toString()
        }
      })
      setBalance(result)
    }
  }, [address])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return { balance }
}
export default useBankBalance
