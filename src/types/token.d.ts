export interface TokenBalance {
  address: string
  name: string
  isDefault: boolean
  balance?: string
  decimal: number
}

export type Tokens = TokenBalance[]
