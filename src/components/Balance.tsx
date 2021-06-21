import React, { FC } from 'react'
import { tokenValue } from '../utils'
import { TokenBalance } from '../graphql/useTokenBalance'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ( { tokenBalance } ) => {
  return (
    <ul>
      {tokenBalance.map((item) => (
        <li key={item.name}>
          <span>{item.name} </span>
          <span>{tokenValue(item.balance, item.decimal)}</span>
        </li>
      ))}
    </ul>
  )
}

export default Balance
