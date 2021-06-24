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
import { Tokens } from './types/token'
import { LCDClient } from '@terra-money/terra.js'
import { useEffect } from 'react'
import useBankBalance from './hooks/useBankBalance'
import useTokenBalance from './hooks/useTokenBalance'
interface ConnectWalletProps {
  tokens: Tokens
}

const ConnectWallet = ({ tokens }: ConnectWalletProps) => {
  const address = useAddress()
  const network = useNetwork()
  const { terraFinderGenerateLink} = useNetwork()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showContent, setShowContent] = useState<boolean>(false)
  const { status, connect, disconnect, network:walletNetwork, availableConnectTypes } =
    useWallet()

  const nativeTokens = tokens.filter((t) => !t.address.startsWith('terra'))
  const balanceTokens = tokens.filter((t) => t.address.startsWith('terra'))
  const terraClient = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID
  })
  const bankBalance = useBankBalance(address, nativeTokens, terraClient)
  const tokenBalance = useTokenBalance(address, balanceTokens, terraClient)
  const assets = [...(bankBalance.balance || []),...(tokenBalance.balance || [])]

  const connectWallet = useCallback(() => {
    if (availableConnectTypes.length > 1) {
      setShowOptions(true)
    } else if (availableConnectTypes.length === 1) {
      connect(availableConnectTypes[0])
    }
  }, [availableConnectTypes, connect])

  const disconnectWallet = useCallback(() => {
    disconnect()
    setShowContent(false)
  }, [disconnect])
  const onClickAway = useCallback(() => {
    setShowOptions(false)
    setShowContent(false)
  }, [])

  useEffect
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
                network={walletNetwork}
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
