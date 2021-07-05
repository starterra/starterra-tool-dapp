import React from 'react'
import ConnectWallet from '../ConnectWallet'
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
  ConnectType
} from '@terra-money/wallet-provider'
import { render} from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
declare type HumanAddr = string & {
  __type: 'HumanAddr'
}

jest.mock('@terra-money/wallet-provider')

jest.mock('../hooks', () => ({
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
  it('show connected button when wallet is connected', async () => {
    mocked(useWallet).mockImplementation(() => ({
      status: WalletStatus.WALLET_CONNECTED,
      network: { name: 'testnet', chainID: 'tequila-0004', lcd: 'https://tequila-lcd.terra.dev' },
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
      network: { name: 'testnet', chainID: 'tequila-0004', lcd: 'https://tequila-lcd.terra.dev' },
      terraAddress: 'terra1vvhz3w5f0p9yzaacglq078n0ya3grwnwzsyqr9' as HumanAddr,
      walletAddress: 'terra1vvhz3w5f0p9yzaacglq078n0ya3grwnwzsyqr9' as HumanAddr,
      post: jest.fn(),
      availablePost: true,
      connectType: ConnectType.CHROME_EXTENSION
    }))
    
    const { findByTestId } = render(
      <ConnectWallet tokens={[]} readOnlyMode={false} />
    )

    expect(await findByTestId('connected-button')).toBeDefined()
    expect(useWallet).toHaveBeenCalled() 
  })

  it('show connect button when wallet is not connected', async () => {
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
  })

  
})
