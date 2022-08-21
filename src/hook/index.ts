import { Contract, utils } from "ethers";
import GourmetAbi from "../../contract/Gourmet.json";
import { Gourmet } from "../../contract";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const gourmetInterface = new utils.Interface(GourmetAbi.abi);
export const contract = new Contract(
  contractAddress,
  gourmetInterface
) as Gourmet;
