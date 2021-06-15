import React from 'react';
import useClipboard from "react-use-clipboard";
import { Button, Paper, ButtonGroup } from "@material-ui/core";
import { NetworkInfo } from "@terra-dev/wallet-types";
import { getEllipsisTxt } from "../utils";
import LaunchIcon from "@material-ui/icons/Launch";
import Check from "@material-ui/icons/Check";
import { MsgSend ,CreateTxOptions} from "@terra-money/terra.js";
import { useWallet} from "@terra-money/wallet-provider";
import Balance from "./Balance";
import useBalance from "../hooks/useBalance";

interface WalletContentProps {
  address: string;
  network: NetworkInfo;
  finderLink: string;
  disconnect?: () => void;
}

const WalletContent = (props: WalletContentProps) => {
  const { address, disconnect, finderLink } = props;

  const [isCopied, setCopied] = useClipboard(address, {
    successDuration: 10000,
  });

  const { post } = useWallet();
  const { balance } = useBalance();

  const send = async () => {
    try {
      const msgs = new MsgSend(
        address,
        "terra1emzp66cqvcnyjrmdmlwsef36r37g6vl78rwadu",
        { uusd: 1000000 }
      );
      const txOptions:CreateTxOptions = {
        msgs: [msgs],
        memo: "test from terra",
        gasAdjustment:1.5
      };

      const response = await post(txOptions);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Paper elevation={3}>
      <h3>{getEllipsisTxt(address)}</h3>
      <h4>Avaliable</h4>
      <Balance tokenBalance={balance} />
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="outlined secondary button group"
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={setCopied}
          endIcon={isCopied && <Check />}
        >
          Copy address
        </Button>
        <Button color="primary" startIcon={<LaunchIcon />} href={finderLink}>
          View on Terra Finder
        </Button>
        <Button color="primary" variant="outlined" onClick={send}>
          Send
        </Button>

        <Button variant="outlined" onClick={disconnect} color="secondary">
          Disconnect
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default WalletContent;
