import { useWallet } from "@terra-money/wallet-provider";
import { TERRA_FINDER, avaliableNetworks } from "../avaliableNetworks";

const useNetwork = () => {
  const { network } = useWallet();

  const currentNetwork = avaliableNetworks[network.name];

  const terraFinderGenerateLink = (address: string, path: string = "account") =>
    `${TERRA_FINDER}/${currentNetwork.chainID}/${path}/${address}`;

  return { ...currentNetwork, ...network, terraFinderGenerateLink }
}

export default useNetwork
