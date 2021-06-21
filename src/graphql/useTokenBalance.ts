import { useEffect, useState } from 'react'
import { useQuery,ApolloError } from '@apollo/client'
import { TokenBalance, Tokens } from '../types/token'
import alias from './balanceQuery'

const parseResult = (data: Record<string, { Result: string }>) =>
  Object.entries(data).reduce(
    (acc, [token, { Result }]) => ({
      ...acc,
      [token]: JSON.parse(Result).balance
    }),
    {}
  )

const queries = (address: string, contracts:Tokens) =>
  alias(
    contracts.map((item:TokenBalance) => ({
      token: item.address,
      walletAddress: address
    }))
  )

const useTokenBalance = (
  address: string, contracts:Tokens
): { loading: boolean; error:ApolloError|undefined, list?: TokenBalance[] } => {
  const [result, setResult] = useState<Record<string, string>>()
  const { loading, error, data } = useQuery(queries(address, contracts))

  useEffect(() => {
    if (data) {
      setResult(parseResult(data))
    }
  }, [address, data])

  return {
    loading,
    error,
    list:
      result &&
      contracts &&
      Object.entries(result).map(([token, balance]) => ({
        ...contracts.filter(c=>c.address === token)[0],
        balance
      }))
  }
}

export default useTokenBalance
