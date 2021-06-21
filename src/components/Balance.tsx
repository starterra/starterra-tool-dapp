import React, { FC } from 'react'
import { tokenValueTxt } from '../utils'
import { TokenBalance } from '../types/token'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ( { tokenBalance } ) => {
  return (
    <ul>
      {tokenBalance.map((item) => (
        <li key={item.name}>
          <span>{tokenValueTxt(item)}</span>
        </li>
      ))}
    </ul>
  )
}

export default Balance
