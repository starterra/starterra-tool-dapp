import BigNumber from 'bignumber.js'
import { TokenBalance } from './types/token'

export const getEllipsisTxt = (text: string = '', n = 6) => {
  return `${text.substr(0, n)}...${text.substr(text.length - n, text.length)}`
}

export const tokenValue = (value?: string, decimal: number = 6, precision:number=4) =>
new BigNumber(value || 0).div(new BigNumber(10).pow(decimal)).toFormat(precision)

export const tokenValueNumber = (value?: string, decimal: number = 6) =>
new BigNumber(value || 0).div(new BigNumber(10).pow(decimal)).toNumber()


export const tokenValueTxt = (token:TokenBalance) => 
    `${tokenValue(token.balance,token.decimal,2)} ${token.name}`

 export const isSmartContract = (address: string) => address.startsWith('terra')