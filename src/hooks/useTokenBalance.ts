import { useState, useEffect, useCallback } from 'react'
import { LCDClient } from '@terra-money/terra.js'
import { Tokens } from '../types/token'
import BigNumber from 'bignumber.js'

interface IResponse {
  balance: string
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
          const response: IResponse = await terraClient.wasm.contractQuery(
            contract.address,
            { balance: { address: address } }
          )
          return {
            ...contract,
            balance: response.balance
          }
        })
      )
      setBalance(results.filter((r) => new BigNumber(r.balance).toNumber() > 0))
    }
  }, [address])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return { balance, fetchBalance }
}
export default useTokenBalance
