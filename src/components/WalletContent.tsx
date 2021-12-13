import * as trans from '../translation'

import React, { FC } from 'react'

import Balance from './Balance'
import FilterNone from '@material-ui/icons/FilterNone'
import LaunchIcon from '@material-ui/icons/Launch'
import { NetworkInfo } from '@terra-dev/wallet-types'
import SendDialog from './SendDialog'
import { TokenBalance } from '../types/token'
import { getEllipsisTxt } from '../utils'
import useClipboard from 'react-use-clipboard'
import CloseIcon from '@material-ui/icons/Close'
import { useMediaQuery } from 'react-responsive'
import IconButton from './IconButton'

interface WalletContentProps {
  modalIsOpen: boolean
  address: string
  network: NetworkInfo
  finderLink: string
  assets: TokenBalance[]
  disconnect?: () => void
  close: () => void
}

const WalletContent: FC<WalletContentProps> = ({
  address,
  disconnect,
  finderLink,
  assets,
  close
}) => {
  const [isCopied, setCopied] = useClipboard(address, {
    successDuration: 10000
  })
  const isMobile = useMediaQuery({ maxWidth: 850 })

  return (
    <div className='wallet-content'>
      <div className='wallet-section'>
        {isMobile && (
          <div className='wallet-section-close'>
            <IconButton onClick={close} color='secondary' size='small'>
              <CloseIcon />
            </IconButton>
          </div>
        )}
        <div className='wallet-header'>
          <div data-testid='address'>{getEllipsisTxt(address, 9)}</div>
          <IconButton
            ariaLabel='copy'
            color={isCopied ? 'secondary' : 'primary'}
            onClick={setCopied}
            size='small'
          >
            <FilterNone style={{ fontSize: 12 }} />
          </IconButton>
        </div>
        <Balance tokenBalance={assets} />
        {assets?.length ? (
          <SendDialog walletAddress={address} tokensBalance={assets} />
        ) : null}
        <a href={finderLink} className='link-button'>
          <span className='icon-button-label icon-button-small-size'>
            <LaunchIcon style={{ fontSize: 20 }} />
            <span className='link-button-text'>{trans.VIEW_ON_TERRA_TXT}</span>
          </span>
        </a>
      </div>
      <button className='button-disconnect outlined' onClick={disconnect}>
        {trans.DISCONNECT_TXT}
      </button>
    </div>
  )
}

export default WalletContent
