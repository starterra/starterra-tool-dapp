import React, { FC } from 'react'
import { tokenValue } from '../utils'
import { TokenBalance } from '../types/token'
import useStyles from '../styles/useStyles'

interface BalanceProps {
  tokenBalance: TokenBalance[]
}

const Balance: FC<BalanceProps> = ( { tokenBalance } ) => {
  const classes = useStyles()
  return (
    <div className={classes.balanceSection}>
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
