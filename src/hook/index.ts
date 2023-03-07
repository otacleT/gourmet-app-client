import {Contract, utils} from 'ethers'

import {Gourmet} from '../../contract'
import GourmetAbi from '../../contract/Gourmet.json'

const contractAddress = '0x92F146EF3cFaA63d44301bEFc842CF0de844e2b7'
const gourmetInterface = new utils.Interface(GourmetAbi.abi)
export const contract = new Contract(contractAddress, gourmetInterface) as Gourmet
