import { useEffect, useState } from 'react'
import { useQuery,ApolloError } from '@apollo/client'

import alias from './balanceQuery'

const contracts = {
  terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6: {
    name: 'MIR',
    isDefault: false,
    decimal: 6
  },
  terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76: {
    name: 'ANC',
    isDefault: false,
    decimal: 6
  }
}

export interface Token {
  name: string
  isDefault: boolean
}

export interface TokenBalance extends Token {
  balance: string
}

export type Tokens = Record<string, Token>

const parseResult = (data: Record<string, { Result: string }>) =>
  Object.entries(data).reduce(
    (acc, [token, { Result }]) => ({
      ...acc,
      [token]: JSON.parse(Result).balance
    }),
    {}
  )

const queries = (address: string) =>
  alias(
    Object.entries(contracts).map(([key]) => ({
      token: key,
      walletAddress: address
    }))
  )

const useTokenBalance = (
  address: string
): { loading: boolean; error:ApolloError|undefined, list?: TokenBalance[] } => {
  const [result, setResult] = useState<Record<string, string>>()
  const { loading, error, data } = useQuery(queries(address))

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
        ...contracts[token],
        balance
      }))
  }
}

export default useTokenBalance
