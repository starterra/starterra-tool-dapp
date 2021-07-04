import React, { FC } from 'react'
import { tokenValue } from '../utils'
import { TokenBalance } from '../types/token'
import useStyles from '../styles/useStyles'
import * as trans from '../translation'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ( { tokenBalance } ) => {
  const classes = useStyles()
  return (
    <div className={classes.balanceSection}>
      {tokenBalance.length ===0}{
        <h4>{trans.EMPTY_WALLET}</h4>
      }
      {tokenBalance.map((item) => (
        <div className={classes.balanceItem} key={item.name}>
          <h4>{item.name}</h4>
          <span>{tokenValue(item.balance)}</span>
        </div>
      ))}
    </div>
  )
}

export default Balance
