import { Contract, utils } from "ethers";
import GourmetAbi from "../../types/Gourmet.json";
import { Gourmet } from "../../types";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const gourmetInterface = new utils.Interface(GourmetAbi.abi);
export const contract = new Contract(
  contractAddress,
  gourmetInterface
) as Gourmet;
