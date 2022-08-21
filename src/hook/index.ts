import { Contract, utils } from "ethers";
import GourmetAbi from "../../contract/Gourmet.json";
import { Gourmet } from "../../contract";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const gourmetInterface = new utils.Interface(GourmetAbi.abi);
export const contract = new Contract(
  contractAddress,
  gourmetInterface
) as Gourmet;
