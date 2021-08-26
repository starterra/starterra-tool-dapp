import useAddress from './hooks/useAddress'
import ConnectButton from './components/ConnectButton'
import ConnectedButton from './components/ConnectedButton'
import ConnectWalletOptionList from './components/ConnectWalletOpionList'
import WalletContent from './components/WalletContent'
import { ClickAwayListener } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import useNetwork from './hooks/useNetwork'
import {
  NetworkInfo,
  useWallet,
  WalletStatus
} from '@terra-money/wallet-provider'
import * as trans from './translation'
import { Tokens } from './types/token'
import { LCDClient } from '@terra-money/terra.js'
import useBankBalance from './hooks/useBankBalance'
import useTokenBalance from './hooks/useTokenBalance'
import { useMediaQuery } from 'react-responsive'

export interface IConnectWalletProps {
  tokens: Tokens
  readOnlyMode: boolean
  avaliableNetworks?: Record<string, NetworkInfo>
}

const ConnectWallet = ({
  tokens,
  readOnlyMode,
  avaliableNetworks
}: IConnectWalletProps) => {
  const address = useAddress()
  const network = useNetwork()
  const { terraFinderGenerateLink } = useNetwork()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showContent, setShowContent] = useState<boolean>(false)
  const {
    status,
    connect,
    disconnect,
    network: walletNetwork,
    availableConnectTypes
  } = useWallet()

  const nativeTokens = tokens.filter((t) => !t.address.startsWith('terra'))
  const balanceTokens = tokens.filter((t) => t.address.startsWith('terra'))
  const lcd =
    walletNetwork.name === 'mainnet' ? avaliableNetworks![1].lcd : network.lcd

  const updatedWalletNetwork = {
    ...walletNetwork,
    lcd
  }
  const terraClient = new LCDClient({
    URL: lcd,
    chainID: network.chainID
  })

  console.log(terraClient.config.URL);
  
  const { balance: bankBalance, fetchBalance: fetchBankBalance } =
    useBankBalance(address, nativeTokens, terraClient)
  const { balance: tokenBalance, fetchBalance: fetchTokenBalance } =
    useTokenBalance(address, balanceTokens, terraClient)
  const assets = [...(bankBalance || []), ...(tokenBalance || [])]
  const isMobile = useMediaQuery({ maxWidth: 850 })

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

            <ConnectWalletOptionList
              readOnlyMode={readOnlyMode}
              open={showOptions}
              handleClose={() => setShowOptions(false)}
            />
          </div>
        </ClickAwayListener>
      )

    case WalletStatus.WALLET_CONNECTED: {
      if (isMobile) {
        return (
          <React.Fragment>
            <ConnectedButton
              address={address}
              defaultToken={assets.filter((a) => a && a.isDefault)[0]}
              onClick={() => setShowContent((prev) => !prev)}
              open={showContent}
            />
            <div
              className={`${
                showContent
                  ? 'wallet-content-animated-move'
                  : 'wallet-content-animated'
              }`}
            >
              {showContent && (
                <ClickAwayListener onClickAway={onClickAway}>
                  <div>
                    <WalletContent
                      address={address}
                      network={updatedWalletNetwork}
                      finderLink={terraFinderGenerateLink(address)}
                      disconnect={disconnectWallet}
                      assets={assets}
                      close={() => setShowContent(false)}
                    />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </React.Fragment>
        )
      }
      return (
        <React.Fragment>
          <ConnectedButton
            address={address}
            defaultToken={assets.filter((a) => a && a.isDefault)[0]}
            onClick={() => {
              setShowContent((prev) => !prev)
              fetchBankBalance()
              fetchTokenBalance()
            }}
            open={showContent}
          />
          {showContent && (
            <ClickAwayListener onClickAway={onClickAway}>
              <div>
                <WalletContent
                  address={address}
                  network={updatedWalletNetwork}
                  finderLink={terraFinderGenerateLink(address)}
                  disconnect={disconnectWallet}
                  assets={assets}
                  close={() => setShowContent(false)}
                />
              </div>
            </ClickAwayListener>
          )}
        </React.Fragment>
      )
    }
  }
}

export default ConnectWallet
