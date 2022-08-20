import { Contract, utils } from "ethers";
import GourmetAbi from "../../contract/Gourmet.json";
import { Gourmet } from "../../contract";

const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const gourmetInterface = new utils.Interface(GourmetAbi.abi);
export const contract = new Contract(
  contractAddress,
  gourmetInterface
) as Gourmet;
