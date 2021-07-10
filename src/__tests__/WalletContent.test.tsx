import React from 'react'
import WalletContent from '../components/WalletContent'
import { render } from '@testing-library/react'
import { TokenBalance } from '../types/token'
import { NetworkInfo } from '@terra-money/wallet-provider'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import { mocked } from 'ts-jest/utils'
jest.mock('@terra-money/wallet-provider')

describe('WalletContent', () => {
  it('is truthy', () => {
    expect(WalletContent).toBeTruthy()
  })
  it('should display address', async () => {
    mocked(useWallet).mockImplementation(() => ({
      status: WalletStatus.WALLET_NOT_CONNECTED,
      network: { name: 'name', chainID: 'test', lcd: 'lcd' },
      availableConnectTypes: [],
      connect: jest.fn(),
      connectReadonly: jest.fn(),
      availableInstallTypes: [],
      install: jest.fn(),
      disconnect: jest.fn(),
      post: jest.fn(),
      recheckStatus: jest.fn(),
      wallets: []
    }))

    const sampleToken: TokenBalance = {
      address: 'ter',
      isDefault: false,
      decimal: 6,
      name: 'token',
      balance: '0'
    }
    const network: NetworkInfo = {
      name: 'name',
      chainID: 'test',
      lcd: 'lcd'
    }
    const { findByTestId } = render(
      <WalletContent
        address={'terra1'}
        finderLink={'link'}
        assets={[sampleToken]}
        disconnect={jest.fn()}
        network={network}
      />
    )
    expect(await findByTestId('address')).toBeDefined()
  })
})
