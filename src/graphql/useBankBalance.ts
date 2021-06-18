import { gql, useQuery } from '@apollo/client'

export interface TokenBalanceResponse {
  Denom: string
  Amount: string
}

const contracts = {
  uluna: {
    name: 'LUNA',
    isDefault: false,
    decimal: 6
  },
  uusd: {
    name: 'UST',
    isDefault: true,
    decimal: 6
  }
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
export default (address: string) => {
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
          ...contracts[item.Denom],
          balance: item.Amount
        }
      })
  }
}
