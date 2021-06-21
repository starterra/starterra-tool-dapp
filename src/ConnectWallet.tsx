import useAddress from './hooks/useAddress'
import ConnectButton from './components/ConnectButton'
import ConnectedButton from './components/ConnectedButton'
import ConnectWalletOptionList from './components/ConnectWalletOpionList'
import WalletContent from './components/WalletContent'
import { ClickAwayListener } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import useNetwork from './hooks/useNetwork'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import * as trans from './translation'
import useTokenBalance from './graphql/useTokenBalance'
import useBankBalance from './graphql/useBankBalance'
import {Tokens} from './types/token'

interface ConnectWalletProps {
    tokens:Tokens
}

const ConnectWallet = ({tokens}:ConnectWalletProps) => {
  const address = useAddress()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showContent, setShowContent] = useState<boolean>(false)
  const { status, connect, disconnect, network, availableConnectTypes } =
    useWallet()

  const { terraFinderGenerateLink } = useNetwork()
  const nativeTokens = tokens.filter(t=>!t.address.startsWith('terra'))
  const balanceTokens  = tokens.filter(t=>t.address.startsWith('terra'))

  const balance = useTokenBalance(address,balanceTokens)

  const bank = useBankBalance(address,nativeTokens)
  const assets = [...(bank.list || []), ...(balance.list || [])]

  const connectWallet = useCallback(() => {
    if (availableConnectTypes.length > 1) {
      setShowOptions(true)
    } else if (availableConnectTypes.length === 1) {
      connect(availableConnectTypes[0])
    }
  }, [availableConnectTypes, connect])

  const disconnectWallet = () => {
    disconnect()
    setShowContent(false)
  }

  const onClickAway = () => {
    setShowOptions(false)
    setShowContent(false)
  }

  switch (status) {
    case WalletStatus.INITIALIZING:
      return (
        <div>
          <ConnectButton>{trans.INITIALIZING_TXT}</ConnectButton>
        </div>
      )
    case WalletStatus.WALLET_NOT_CONNECTED:
      return (
        <ClickAwayListener onClickAway={onClickAway}>
          <div>
            <ConnectButton onClick={connectWallet}>
              {trans.CONNECT_WALLET_TXT}
            </ConnectButton>

            {showOptions && <ConnectWalletOptionList />}
          </div>
        </ClickAwayListener>
      )

    case WalletStatus.WALLET_CONNECTED:
      return (
        <ClickAwayListener onClickAway={onClickAway}>
          <div>
            <ConnectedButton
              address={address}
              defaultToken={assets.filter((a) => a && a.isDefault)[0]}
              onClick={() => setShowContent((prev) => !prev)}
            />
            {showContent && (
              <WalletContent
                address={address}
                network={network}
                finderLink={terraFinderGenerateLink(address)}
                disconnect={disconnectWallet}
                assets={assets}
              />
            )}
          </div>
        </ClickAwayListener>
      )
  }
}

export default ConnectWallet
