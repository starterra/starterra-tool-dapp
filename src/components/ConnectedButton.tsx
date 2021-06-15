import React,{ FC } from "react";
import Button from "@material-ui/core/Button";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {getEllipsisTxt} from "../utils";

interface ConnectButtonProps {
  address: string;
  onClick?: () => void;
}

const ConnectedButton: FC<ConnectButtonProps> = (props) => {
  const { address,onClick } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      startIcon={<AccountBalanceWalletIcon />}
    >
      <span>{getEllipsisTxt(address)}</span>
    </Button>
  );
};

export default ConnectedButton;
