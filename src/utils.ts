import BigNumber from 'bignumber.js'
import { TokenBalance } from './types/token'

export const getEllipsisTxt = (text: string = '', n = 6) => {
  return `${text.substr(0, n)}...${text.substr(text.length - n, text.length)}`
}

export const tokenValue = (value?: string, decimal: number = 6) =>
new BigNumber(value || 0).div(new BigNumber(10).pow(decimal)).toFormat(4)

export const tokenValueTxt = (token:TokenBalance) => 
    `${tokenValue(token.balance,token.decimal)} ${token.name}`
