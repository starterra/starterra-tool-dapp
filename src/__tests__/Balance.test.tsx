import React from 'react'
import Balance from '../components/Balance'
import { render } from '@testing-library/react'
import { TokenBalance } from '../types/token'

describe('Balance', () => {
  it('is truthy', () => {
    expect(Balance).toBeTruthy()
  })
  it('should display balance', async () => {
    const token: TokenBalance = {
      address: 'ter',
      isDefault: false,
      decimal: 6,
      name: 'token',
      balance: '0'
    }
    const { findAllByTestId } = render(<Balance tokenBalance={[token]} />)
    expect(await findAllByTestId('balance')).toBeDefined()
  })
})
