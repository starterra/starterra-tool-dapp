import BigNumber from 'bignumber.js'

export const getEllipsisTxt = (text: string = '', n = 6) => {
  return `${text.substr(0, n)}...${text.substr(text.length - n, text.length)}`
}

export const tokenValue = (value?: string, decimal: number = 6) =>
  value?new BigNumber(value)
    .decimalPlaces(decimal, BigNumber.ROUND_DOWN)
    .toFormat(decimal):0
