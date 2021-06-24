import { gql } from '@apollo/client'

interface Item {
  token: string
  walletAddress: string
}

const balanceItem = ({ token, walletAddress }: Item) => `
    ${token}: WasmContractsContractAddressStore(
      ContractAddress: "${token}"
      QueryMsg: "{\\"balance\\": {\\"address\\": \\"${walletAddress}\\"}}"
    ) {
      Height
      Result
    }`

export default (list: Item[]) => gql`
  query {
    ${list.map(balanceItem)}
  }
`


