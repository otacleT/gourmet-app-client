import { Contract, utils } from "ethers";
import GourmetAbi from "../../types/Gourmet.json";
import { Gourmet } from "../../types";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const gourmetInterface = new utils.Interface(GourmetAbi.abi);
export const contract = new Contract(
  contractAddress,
  gourmetInterface
) as Gourmet;
