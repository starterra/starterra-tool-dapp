export interface IGasSetting {
  GAS_ADJUSTMENT: number
  GAS: number
  GAS_AMOUNT: string
  PRICE_ENDPOINT: string
}

export const gasSettings: Record<string, IGasSetting> = {
  testnet: {
    GAS_ADJUSTMENT: 1.6,
    GAS: 1000000,
    GAS_AMOUNT: '250000uusd',
    PRICE_ENDPOINT: 'https://bombay-fcd.terra.dev/v1/txs/gas_prices'
  },
  mainnet: {
    GAS_ADJUSTMENT: 1.6,
    GAS: 1000000,
    GAS_AMOUNT: '250000uusd',
    PRICE_ENDPOINT: 'https://fcd.terra.dev/v1/txs/gas_prices'
  }
}
