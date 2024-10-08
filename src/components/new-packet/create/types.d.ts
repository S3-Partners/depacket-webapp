import type { NewPacketFormData } from '@/components/new-packet/create'

export type NamedAddress = {
  name: string
  address: string
  ens?: string
}

export type PendingSafeTx = {
  data: string
  from: string
  nonce: number
  to: string
  value: bigint
  startBlock: number
}

export type PendingSafeData = NewPacketFormData & {
  txHash?: string
  tx?: PendingSafeTx
  taskId?: string
}

export type PendingSafeByChain = Record<string, PendingSafeData | undefined>
