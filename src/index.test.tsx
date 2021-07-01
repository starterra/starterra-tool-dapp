import React from 'react'
import ConnectWallet from './ConnectWallet'
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
  ConnectType
} from '@terra-money/wallet-provider'
import { render, getByTestId, act } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import useBankBalance from './hooks/useBankBalance'
declare type HumanAddr = string & {
  __type: 'HumanAddr'
}

jest.mock('@terra-money/wallet-provider')

jest.mock('./hooks', () => ({
  useAddress: () => ({
    address: 'terraaddress'
  }),
  useNetwork: () => ({
    network: 'testnet',
    terraFinderGenerateLink: 'link'
  }),
  useBankBalance: () => jest.fn()
}))

describe('ConnectWallet', () => {
  it('is truthy', () => {
    expect(ConnectWallet).toBeTruthy()
  })
  it('loading state', async () => {
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

    mocked(useConnectedWallet).mockImplementation(() => ({
      network: { name: 'name', chainID: 'test', lcd: 'lcd' },
      terraAddress: 'terraaddress' as HumanAddr,
      walletAddress: 'terraaddress' as HumanAddr,
      post: jest.fn(),
      availablePost: true,
      connectType: ConnectType.CHROME_EXTENSION
    }))
    const { findByTestId } = render(
      <ConnectWallet tokens={[]} readOnlyMode={false} />
    )

    expect(await findByTestId('connect-button')).toBeDefined()
    expect(useWallet).toHaveBeenCalled()
    //expect(getByTestId(container, 'connect-button')).toBeDefined()
  })
})
