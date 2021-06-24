import { useState, useEffect, useCallback } from 'react'
import { LCDClient } from '@terra-money/terra.js'
import { Tokens } from '../types/token'

interface IResponse{
  balance:string
}
const useTokenBalance = (
  address: string,
  contracts: Tokens,
  terraClient: LCDClient
) => {
  const [balance, setBalance] = useState<Tokens>([])

  const fetchBalance = useCallback(async () => {
    if (address) {
      const results = await Promise.all(
        contracts.map(async (contract) => {
          const response:IResponse = await terraClient.wasm.contractQuery(
            contract.address,
            { balance: { address: address } }
          )
          return {
            ...contract,
            balance: response.balance
          }
        })
      )
      setBalance(results)
    }
  }, [address])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return { balance }
}
export default useTokenBalance
