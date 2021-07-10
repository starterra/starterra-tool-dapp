import { ConnectType, useWallet } from '@terra-money/wallet-provider'
import React, { ReactNode } from 'react'
import { Paper, Button, ButtonGroup } from '@material-ui/core'
import { TerraIcon, WalletIcon } from './Icons'
import { v4 as uuidv4 } from 'uuid'
import * as trans from '../translation'

interface IConnectWalletOptionListProps {
  readOnlyMode: boolean
}

type ConnectOption = { label: string; icon?: ReactNode; onClick: () => void }

const ConnectWalletOptionList = ({
  readOnlyMode
}: IConnectWalletOptionListProps) => {
  const { availableConnectTypes, availableInstallTypes, connect, install } =
    useWallet()

  const connectOptions: Record<string, ConnectOption> = {}
  if (availableInstallTypes.includes(ConnectType.CHROME_EXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.INSTALL_TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => install(ConnectType.CHROME_EXTENSION)
    }
  }
  if (availableConnectTypes.includes(ConnectType.WEBEXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => connect(ConnectType.WEBEXTENSION)
    }
  } else if (availableConnectTypes.includes(ConnectType.CHROME_EXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => connect(ConnectType.CHROME_EXTENSION)
    }
  }
  if (availableConnectTypes.includes(ConnectType.WALLETCONNECT)) {
    connectOptions[uuidv4()] = {
      label: trans.TERRA_MOB_TXT,
      icon: <WalletIcon />,
      onClick: () => connect(ConnectType.WALLETCONNECT)
    }
  }
  if (readOnlyMode && availableConnectTypes.includes(ConnectType.READONLY)) {
    connectOptions[uuidv4()] = {
      label: trans.READ_ONLY_TXT,
      onClick: () => connect(ConnectType.READONLY)
    }
  }
  return (
    <Paper elevation={3} className={'wallet-content'}>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='outlined secondary button group'
      >
        {Object.entries(connectOptions).map(
          ([key, { label, icon, onClick }]) => (
            <Button
              variant='outlined'
              color='primary'
              onClick={onClick}
              key={key}
              startIcon={icon}
            >
              {label}
            </Button>
          )
        )}
      </ButtonGroup>
    </Paper>
  )
}

export default ConnectWalletOptionList
