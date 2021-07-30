import React, { FC } from 'react'
import { tokenValue } from '../utils'
import { TokenBalance } from '../types/token'
import * as trans from '../translation'
import { useMediaQuery } from 'react-responsive'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ({ tokenBalance }) => {
  const isMobile = useMediaQuery({ maxWidth: 850 })

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
          {isMobile ? (
            <span>{tokenValue(item.balance, item.decimal, 4)}</span>
          ) : (
            <span>{tokenValue(item.balance, item.decimal, 6)}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Balance
