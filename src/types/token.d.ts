
export interface TokenBalance {
    name: string
    isDefault: boolean
    balance?: string,
    decimal:number
  }
  
  export type Tokens = Record<string, TokenBalance>