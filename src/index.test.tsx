import React from 'react'
import ConnectWallet from './ConnectWallet'
import { useAddress, useNetwork } from './hooks'
// import useNetwork from './hooks/useNetwork'
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
  ConnectType
} from '@terra-money/wallet-provider'
import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
declare type HumanAddr = string & {
  __type: 'HumanAddr';
};
jest.mock('@terra-money/wallet-provider', () => jest.fn())
// jest.mock('@terra-money/wallet-provider',()=>({
//   useWallet:()=>(
//     {
//     status:'WALLET_NOT_CONNECTED'
//   }),
//   useConnectedWallet: ()=>({
//     connectWallet:'wallet'
//   })
// }))

jest.mock('./hooks', () => ({
  useAddress: () => ({
    address: 'terraaddress'
  }),
  useNetwork: () => ({
    network: 'testnet',
    terraFinderGenerateLink: 'link'
  })
}))

describe('ConnectWallet', () => {
  it('is truthy', () => {
    expect(ConnectWallet).toBeTruthy()
  })
  it('loading state', () => {
    const { container } = render(
      <ConnectWallet tokens={[]} readOnlyMode={false} />
    )
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
 
    mocked(useConnectedWallet).mockImplementation(()=>({
      network: { name: 'name', chainID: 'test', lcd: 'lcd' },
      terraAddress:'terraaddress' as HumanAddr,
      walletAddress:'terraaddress' as HumanAddr,
      post: jest.fn(),
      availablePost: true,
      connectType: ConnectType.CHROME_EXTENSION
    }))

    
    expect(useWallet).toHaveBeenCalled()
    expect(useAddress).toHaveBeenCalled()
    expect(useNetwork).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })
})
