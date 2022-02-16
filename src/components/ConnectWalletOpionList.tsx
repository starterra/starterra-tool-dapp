import { ConnectType, useWallet } from '@terra-money/wallet-provider'
import React, { ReactNode } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { TerraIcon, WalletIcon } from './Icons'
import { v4 as uuidv4 } from 'uuid'
import * as trans from '../translation'
import IconButton from './IconButton'
import Modal from 'react-modal'

interface IConnectWalletOptionListProps {
  readOnlyMode: boolean
  open: boolean
  handleClose: () => void
}

type ConnectOption = { label: string; icon?: ReactNode; onClick: () => void }

const ConnectWalletOptionList = ({
  readOnlyMode,
  open,
  handleClose
}: IConnectWalletOptionListProps) => {
  const { availableConnectTypes, availableInstallTypes, connect, install } =
    useWallet()

  const connectOptions: Record<string, ConnectOption> = {}
  if (availableInstallTypes.includes(ConnectType.EXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.INSTALL_TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => install(ConnectType.EXTENSION)
    }
  }
  if (availableConnectTypes.includes(ConnectType.EXTENSION)) {
    connectOptions[uuidv4()] = {
      label: trans.TERRA_EXT_TXT,
      icon: <TerraIcon />,
      onClick: () => connect(ConnectType.EXTENSION)
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
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          maxHeight: '160px',
          borderRadius: '20px',
          border: '3px solid #2043b5'
        }
      }}
      aria-labelledby='form-dialog-title'
    >
      <div id='form-dialog-title'>
        <IconButton
          onClick={handleClose}
          className='wallet-contect-options-title-close'
        >
          <CloseIcon />
        </IconButton>
        <div className='wallet-contect-options-title'>
          Connect
          <span className='wallet-contect-options-title-second'> Wallet</span>
        </div>
      </div>

      <div>
        <div className='wallet-contect-options-content'>
          {Object.entries(connectOptions).map(
            ([key, { label, icon, onClick }]) => (
              <button
                key={key}
                aria-label='connet'
                className='outlined'
                onClick={onClick}
              >
                <span className='wallet-contect-options-button-label'>
                  <span className='wallet-contect-options-button-icon'>
                    {icon}
                  </span>

                  {label}
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </Modal>
  )
}
export default ConnectWalletOptionList
