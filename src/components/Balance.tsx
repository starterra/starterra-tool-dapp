import React, { FC } from 'react'
import { tokenValue } from '../utils'
import { TokenBalance } from '../types/token'
import * as trans from '../translation'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ({ tokenBalance }) => {
  return (
    <div className={'wallet-balance-section'}>
      {tokenBalance.length === 0 && <h4>{trans.EMPTY_WALLET}</h4>}
      {tokenBalance.map((item) => (
        <div
          className={'wallet-balance-item'}
          key={item.name}
          data-testid='balance'
        >
          <h4>{item.name}</h4>
          <span>{tokenValue(item.balance)}</span>
        </div>
      ))}
    </div>
  )
}

export default Balance
