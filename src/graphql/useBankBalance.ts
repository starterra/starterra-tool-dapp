import { gql, useQuery } from "@apollo/client"

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
  return { loading, error, ...data }
}
