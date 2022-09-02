import { Group, Text } from "@mantine/core";
import { Goerli, useEthers } from "@usedapp/core";

export const WalletConnect = () => {
  const { account, chainId, deactivate, activateBrowserWallet, switchNetwork } =
    useEthers();
  if (account) {
    if (chainId === Goerli.chainId) {
      return (
        <button
          onClick={deactivate}
          className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md"
        >
          Disconnect
        </button>
      );
    } else {
      return (
        <Group>
          <Text color="red">Wrong network</Text>
          <button
            onClick={() => switchNetwork(Goerli.chainId)}
            className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md"
          >
            Switch network
          </button>
        </Group>
      );
    }
  } else {
    return (
      <button
        className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md"
        onClick={activateBrowserWallet}
      >
        Connect wallet
      </button>
    );
  }
};
