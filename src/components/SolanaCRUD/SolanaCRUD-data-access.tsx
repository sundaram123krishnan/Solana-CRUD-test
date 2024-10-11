'use client'

import {getSolanaCRUDProgram, getSolanaCRUDProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useSolanaCRUDProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanaCRUDProgramId(cluster.network as Cluster), [cluster])
  const program = getSolanaCRUDProgram(provider)

  const accounts = useQuery({
    queryKey: ['SolanaCRUD', 'all', { cluster }],
    queryFn: () => program.account.SolanaCRUD.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['SolanaCRUD', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ SolanaCRUD: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolanaCRUDProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanaCRUDProgram()

  const accountQuery = useQuery({
    queryKey: ['SolanaCRUD', 'fetch', { cluster, account }],
    queryFn: () => program.account.SolanaCRUD.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['SolanaCRUD', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ SolanaCRUD: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['SolanaCRUD', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ SolanaCRUD: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['SolanaCRUD', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ SolanaCRUD: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['SolanaCRUD', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ SolanaCRUD: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
