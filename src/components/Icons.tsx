import React from 'react'
import { ReactComponent as Terra } from '../images/Terra.svg'
import { ReactComponent as WalletSVG } from '../images/Walletconnect.svg'
import SvgIcon from '@material-ui/core/SvgIcon'
export const TerraIcon = (props: any) => {
  return (
    <SvgIcon {...props}>
      <Terra />
    </SvgIcon>
  )
}

export const WalletIcon = (props: any) => {
  return (
    <SvgIcon {...props}>
      <WalletSVG />
    </SvgIcon>
  )
}
