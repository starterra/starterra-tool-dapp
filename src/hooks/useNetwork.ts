import { useWallet } from '@terra-money/wallet-provider'

export const TERRA_FINDER = 'https://finder.terra.money'

const useNetwork = () => {
  const { network } = useWallet()

  const terraFinderGenerateLink = (address: string, path: string = 'account') =>
    `${TERRA_FINDER}/${network.chainID}/${path}/${address}`

  return { ...network, terraFinderGenerateLink }
}

export default useNetwork
