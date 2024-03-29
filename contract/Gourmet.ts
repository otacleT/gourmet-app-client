/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type {FunctionFragment, Result, EventFragment} from '@ethersproject/abi'
import type {Listener, Provider} from '@ethersproject/providers'
import type {TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue} from './common'

export interface GourmetInterface extends utils.Interface {
  functions: {
    'Rating(uint256,uint256,uint256)': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'Rating'): FunctionFragment

  encodeFunctionData(
    functionFragment: 'Rating',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string

  decodeFunctionResult(functionFragment: 'Rating', data: BytesLike): Result

  events: {
    'rateLog(uint256,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'rateLog'): EventFragment
}

export interface rateLogEventObject {
  shopId: BigNumber
  result: BigNumber
}
export type rateLogEvent = TypedEvent<[BigNumber, BigNumber], rateLogEventObject>

export type rateLogEventFilter = TypedEventFilter<rateLogEvent>

export interface Gourmet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: GourmetInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    Rating(
      _shopId: PromiseOrValue<BigNumberish>,
      _uStar: PromiseOrValue<BigNumberish>,
      _userPoint: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {from?: PromiseOrValue<string>}
    ): Promise<ContractTransaction>
  }

  Rating(
    _shopId: PromiseOrValue<BigNumberish>,
    _uStar: PromiseOrValue<BigNumberish>,
    _userPoint: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & {from?: PromiseOrValue<string>}
  ): Promise<ContractTransaction>

  callStatic: {
    Rating(
      _shopId: PromiseOrValue<BigNumberish>,
      _uStar: PromiseOrValue<BigNumberish>,
      _userPoint: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {
    'rateLog(uint256,uint256)'(shopId?: null, result?: null): rateLogEventFilter
    rateLog(shopId?: null, result?: null): rateLogEventFilter
  }

  estimateGas: {
    Rating(
      _shopId: PromiseOrValue<BigNumberish>,
      _uStar: PromiseOrValue<BigNumberish>,
      _userPoint: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {from?: PromiseOrValue<string>}
    ): Promise<BigNumber>
  }

  populateTransaction: {
    Rating(
      _shopId: PromiseOrValue<BigNumberish>,
      _uStar: PromiseOrValue<BigNumberish>,
      _userPoint: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & {from?: PromiseOrValue<string>}
    ): Promise<PopulatedTransaction>
  }
}
