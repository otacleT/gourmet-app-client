import { Contract, utils } from "ethers";
import GourmetAbi from "../../constants/Gourmet.json";
import { Gourmet } from "../../constants";

const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const gourmetInterface = new utils.Interface(GourmetAbi.abi);
export const contract = new Contract(
  contractAddress,
  gourmetInterface
) as Gourmet;
