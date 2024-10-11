// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanaCRUDIDL from '../target/idl/SolanaCRUD.json'
import type { SolanaCRUD } from '../target/types/SolanaCRUD'

// Re-export the generated IDL and type
export { SolanaCRUD, SolanaCRUDIDL }

// The programId is imported from the program IDL.
export const SOLANA_CRUD_PROGRAM_ID = new PublicKey(SolanaCRUDIDL.address)

// This is a helper function to get the SolanaCRUD Anchor program.
export function getSolanaCRUDProgram(provider: AnchorProvider) {
  return new Program(SolanaCRUDIDL as SolanaCRUD, provider)
}

// This is a helper function to get the program ID for the SolanaCRUD program depending on the cluster.
export function getSolanaCRUDProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the SolanaCRUD program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANA_CRUD_PROGRAM_ID
  }
}
