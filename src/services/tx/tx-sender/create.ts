// import { getReadOnlyGnosisSafeContract } from '@/services/contracts/safeContracts'
import type { ChainInfo, TransactionDetails } from '@safe-global/safe-gateway-typescript-sdk'
import { getTransactionDetails } from '@safe-global/safe-gateway-typescript-sdk'
// import type { AddOwnerTxParams, RemoveOwnerTxParams, SwapOwnerTxParams } from '@safe-global/protocol-kit'
import type { MetaTransactionData, PacketTransaction, PacketTransactionDataPartial } from '@/types/tx'
import extractTxInfo from '../extractTxInfo'
// import { getAndValidateSafeSDK } from './sdk'

const SENTINEL_ADDRESS = '0x0000000000000000000000000000000000000001'
/**
 * Create a transaction from raw params
 */
// export const createTx = async (txParams: PacketTransactionDataPartial, nonce?: number): Promise<PacketTransaction> => {
//   if (nonce !== undefined) txParams = { ...txParams, nonce }
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createTransaction({ transactions: [txParams] })
// }

/**
 * Create a multiSendCallOnly transaction from an array of MetaTransactionData and options
 * If only one tx is passed it will be created without multiSend and without onlyCalls.
 */
// export const createMultiSendCallOnlyTx = async (txParams: MetaTransactionData[]): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createTransaction({ transactions: txParams, onlyCalls: true })
// }

// export const createRemoveOwnerTx = async (txParams: RemoveOwnerTxParams): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createRemoveOwnerTx(txParams)
// }

// export const createAddOwnerTx = async (
//   chain: ChainInfo,
//   isDeployed: boolean,
//   txParams: AddOwnerTxParams,
// ): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   if (isDeployed) return safeSDK.createAddOwnerTx(txParams)

//   const safeVersion = await safeSDK.getContractVersion()

//   const contract = await getReadOnlyGnosisSafeContract(chain, safeVersion)
//   // @ts-ignore
//   const data = contract.encode('addOwnerWithThreshold', [txParams.ownerAddress, txParams.threshold])

//   const tx = {
//     to: await safeSDK.getAddress(),
//     value: '0',
//     data,
//   }

//   return safeSDK.createTransaction({
//     transactions: [tx],
//   })
// }

// export const createSwapOwnerTx = async (
//   chain: ChainInfo,
//   isDeployed: boolean,
//   txParams: SwapOwnerTxParams,
// ): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   if (isDeployed) return safeSDK.createSwapOwnerTx(txParams)

//   const safeVersion = await safeSDK.getContractVersion()

//   const contract = await getReadOnlyGnosisSafeContract(chain, safeVersion)
//   const data = contract.encode('swapOwner', [SENTINEL_ADDRESS, txParams.oldOwnerAddress, txParams.newOwnerAddress])

//   const tx = {
//     to: await safeSDK.getAddress(),
//     value: '0',
//     data,
//   }

//   return safeSDK.createTransaction({
//     transactions: [tx],
//   })
// }

// export const createUpdateThresholdTx = async (threshold: number): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createChangeThresholdTx(threshold)
// }

// export const createRemoveModuleTx = async (moduleAddress: string): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createDisableModuleTx(moduleAddress)
// }

// export const createRemoveGuardTx = async (): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createDisableGuardTx()
// }

/**
 * Create a rejection tx
 */
// export const createRejectTx = async (nonce: number): Promise<PacketTransaction> => {
//   const safeSDK = getAndValidateSafeSDK()
//   return safeSDK.createRejectionTransaction(nonce)
// }

/**
 * Prepare a SafeTransaction from Client Gateway / Tx Queue
 */
// export const createExistingTx = async (
//   chainId: string,
//   safeAddress: string,
//   txId: string,
//   txDetails?: TransactionDetails,
// ): Promise<PacketTransaction> => {
//   // Get the tx details from the backend if not provided
//   txDetails = txDetails || (await getTransactionDetails(chainId, txId))

//   // Convert them to the Core SDK tx params
//   const { txParams, signatures } = extractTxInfo(txDetails, safeAddress)

//   // Create a tx and add pre-approved signatures
//   const safeTx = await createTx(txParams, txParams.nonce)
//   Object.entries(signatures).forEach(([signer, data]) => {
//     safeTx.addSignature({
//       signer,
//       data,
//       staticPart: () => data,
//       dynamicPart: () => '',
//       isContractSignature: false,
//     })
//   })

//   return safeTx
// }
