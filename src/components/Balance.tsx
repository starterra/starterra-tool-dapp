import React, { FC } from 'react'
import { tokenValue } from '../utils'
import { TokenBalance } from '../types/token'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ( { tokenBalance } ) => {
  return (
    <div className={'wallet-balance-section'}>
      {tokenBalance.map((item) => (
        <div className={'wallet-balance-item'} key={item.name}>
          <h4>{item.name}</h4>
          <span>{tokenValue(item.balance)}</span>
        </div>
      ))}
    </div>
  )
}

export default Balance
