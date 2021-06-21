import { gql, useQuery, ApolloError } from '@apollo/client'
import { TokenBalance, Tokens } from '../types/token'

export interface TokenBalanceResponse {
  Denom: string
  Amount: string
}

const QUERY = gql`
  query BankBalancesAddress($address: String) {
    BankBalancesAddress(Address: $address) {
      Result {
        Amount
        Denom
      }
    }
  }
`
export default (
  address: string, contracts:Tokens
): {
  loading: boolean
  error: ApolloError | undefined
  list?: TokenBalance[]
} => {
  const { loading, error, data } = useQuery(QUERY, { variables: { address } })
  return {
    loading,
    error,
    list:
      contracts &&
      data &&
      data.BankBalancesAddress &&
      data.BankBalancesAddress.Result.map((item: TokenBalanceResponse) => {
        return {
          ...contracts.find(c=>c.address == item.Denom),
          balance: item.Amount
        }
      })
  }
}
