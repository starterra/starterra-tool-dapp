import BigNumber from 'bignumber.js'
import { TokenBalance } from './graphql/useTokenBalance'

export const getEllipsisTxt = (text: string = '', n = 6) => {
  return `${text.substr(0, n)}...${text.substr(text.length - n, text.length)}`
}

export const tokenValue = (value?: string, decimal: number = 6) =>
new BigNumber(value || 0).div(new BigNumber(10).pow(decimal)).toFormat(4)

export const n6 = new Intl.NumberFormat("en-us",{
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 6
});

export const tokenValueTxt = (token:TokenBalance) => 
    `${tokenValue(token.balance,token.decimal)} ${token.name}`
