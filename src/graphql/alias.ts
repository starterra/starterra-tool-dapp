import { gql } from '@apollo/client'

interface Item {
  token: string
  walletAddress: string
}

const aliasItem = ({ token, walletAddress }: Item) => `
    ${token}: WasmContractsContractAddressStore(
      ContractAddress: "${token}"
      QueryMsg: "{\\"balance\\": {\\"address\\": \\"${walletAddress}\\"}}"
    ) {
      Height
      Result
    }`

export default (list: Item[]) => gql`
  query {
    ${list.map(aliasItem)}
  }
`


