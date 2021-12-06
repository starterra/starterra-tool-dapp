import { LCDClient } from '@terra-money/terra.js'
import { useCallback, useEffect, useState } from 'react'

import { Tokens } from '../types/token'

const useBankBalance = (
  address: string,
  contracts: Tokens,
  terraClient: LCDClient
) => {
  const [balance, setBalance] = useState<Tokens>([])

  const fetchBalance = useCallback(async () => {
    if (address) {
      const response: any = await terraClient.bank.balance(address)
      console.log(response)
      const result: Tokens = response[0].map((item: any) => {
        console.log(item)
        return {
          ...contracts.find((c) => c.address === item.denom)!,
          balance: item.amount.toString()
        }
      })
      setBalance(result.filter((item) => item.address !== undefined))
    }
  }, [address])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return { balance, fetchBalance }
}
export default useBankBalance
