/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Gourmet, GourmetInterface } from "../Gourmet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "address_ja",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "latitude",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "longitude",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "star",
        type: "uint256",
      },
    ],
    name: "NewMap",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
      {
        internalType: "string",
        name: "_address_ja",
        type: "string",
      },
      {
        internalType: "int256",
        name: "_latitude",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "_longitude",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "_star",
        type: "uint256",
      },
    ],
    name: "addMap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "eval",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "string",
        name: "address_ja",
        type: "string",
      },
      {
        internalType: "int256",
        name: "latitude",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "longitude",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "star",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506108c0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630a5a38951461003b5780637ed0404114610070575b600080fd5b61005560048036038101906100509190610457565b61008c565b6040516100679695949392919061054f565b60405180910390f35b61008a60048036038101906100859190610682565b610260565b005b60006020528060005260406000206000915090508060000180546100af906107a0565b80601f01602080910402602001604051908101604052809291908181526020018280546100db906107a0565b80156101285780601f106100fd57610100808354040283529160200191610128565b820191906000526020600020905b81548152906001019060200180831161010b57829003601f168201915b50505050509080600101805461013d906107a0565b80601f0160208091040260200160405190810160405280929190818152602001828054610169906107a0565b80156101b65780601f1061018b576101008083540402835291602001916101b6565b820191906000526020600020905b81548152906001019060200180831161019957829003601f168201915b5050505050908060020180546101cb906107a0565b80601f01602080910402602001604051908101604052809291908181526020018280546101f7906107a0565b80156102445780601f1061021957610100808354040283529160200191610244565b820191906000526020600020905b81548152906001019060200180831161022757829003601f168201915b5050505050908060030154908060040154908060050154905086565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905089898260000191906102b592919061034c565b5087878260010191906102c992919061034c565b5085858260020191906102dd92919061034c565b508381600301819055508281600401819055508181600501819055507fccaa35ae62847c61647d0ea5ae4ba75f88b5d6fe02a6856676cef66e97b3e7ae8a8a8a8a8a8a8a8a8a6040516103389998979695949392919061080e565b60405180910390a150505050505050505050565b828054610358906107a0565b90600052602060002090601f01602090048101928261037a57600085556103c1565b82601f1061039357803560ff19168380011785556103c1565b828001600101855582156103c1579182015b828111156103c05782358255916020019190600101906103a5565b5b5090506103ce91906103d2565b5090565b5b808211156103eb5760008160009055506001016103d3565b5090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610424826103f9565b9050919050565b61043481610419565b811461043f57600080fd5b50565b6000813590506104518161042b565b92915050565b60006020828403121561046d5761046c6103ef565b5b600061047b84828501610442565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156104be5780820151818401526020810190506104a3565b838111156104cd576000848401525b50505050565b6000601f19601f8301169050919050565b60006104ef82610484565b6104f9818561048f565b93506105098185602086016104a0565b610512816104d3565b840191505092915050565b6000819050919050565b6105308161051d565b82525050565b6000819050919050565b61054981610536565b82525050565b600060c082019050818103600083015261056981896104e4565b9050818103602083015261057d81886104e4565b9050818103604083015261059181876104e4565b90506105a06060830186610527565b6105ad6080830185610527565b6105ba60a0830184610540565b979650505050505050565b600080fd5b600080fd5b600080fd5b60008083601f8401126105ea576105e96105c5565b5b8235905067ffffffffffffffff811115610607576106066105ca565b5b602083019150836001820283011115610623576106226105cf565b5b9250929050565b6106338161051d565b811461063e57600080fd5b50565b6000813590506106508161062a565b92915050565b61065f81610536565b811461066a57600080fd5b50565b60008135905061067c81610656565b92915050565b600080600080600080600080600060c08a8c0312156106a4576106a36103ef565b5b60008a013567ffffffffffffffff8111156106c2576106c16103f4565b5b6106ce8c828d016105d4565b995099505060208a013567ffffffffffffffff8111156106f1576106f06103f4565b5b6106fd8c828d016105d4565b975097505060408a013567ffffffffffffffff8111156107205761071f6103f4565b5b61072c8c828d016105d4565b9550955050606061073f8c828d01610641565b93505060806107508c828d01610641565b92505060a06107618c828d0161066d565b9150509295985092959850929598565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806107b857607f821691505b602082108114156107cc576107cb610771565b5b50919050565b82818337600083830152505050565b60006107ed838561048f565b93506107fa8385846107d2565b610803836104d3565b840190509392505050565b600060c0820190508181036000830152610829818b8d6107e1565b9050818103602083015261083e81898b6107e1565b905081810360408301526108538187896107e1565b90506108626060830186610527565b61086f6080830185610527565b61087c60a0830184610540565b9a995050505050505050505056fea2646970667358221220a69f4e0a4470c496f12545c198126d306a81acaeaa496bb98e1e1d34a63aaa2764736f6c63430008090033";

type GourmetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GourmetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Gourmet__factory extends ContractFactory {
  constructor(...args: GourmetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Gourmet> {
    return super.deploy(overrides || {}) as Promise<Gourmet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Gourmet {
    return super.attach(address) as Gourmet;
  }
  override connect(signer: Signer): Gourmet__factory {
    return super.connect(signer) as Gourmet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GourmetInterface {
    return new utils.Interface(_abi) as GourmetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Gourmet {
    return new Contract(address, _abi, signerOrProvider) as Gourmet;
  }
}