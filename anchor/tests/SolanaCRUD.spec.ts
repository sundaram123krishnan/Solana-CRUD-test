import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {SolanaCRUD} from '../target/types/SolanaCRUD'
import '@types/jest';

describe('SolanaCRUD', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.SolanaCRUD as Program<SolanaCRUD>

  const SolanaCRUDKeypair = Keypair.generate()

  it('Initialize SolanaCRUD', async () => {
    await program.methods
      .initialize()
      .accounts({
        SolanaCRUD: SolanaCRUDKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([SolanaCRUDKeypair])
      .rpc()

    const currentCount = await program.account.SolanaCRUD.fetch(SolanaCRUDKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment SolanaCRUD', async () => {
    await program.methods.increment().accounts({ SolanaCRUD: SolanaCRUDKeypair.publicKey }).rpc()

    const currentCount = await program.account.SolanaCRUD.fetch(SolanaCRUDKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment SolanaCRUD Again', async () => {
    await program.methods.increment().accounts({ SolanaCRUD: SolanaCRUDKeypair.publicKey }).rpc()

    const currentCount = await program.account.SolanaCRUD.fetch(SolanaCRUDKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement SolanaCRUD', async () => {
    await program.methods.decrement().accounts({ SolanaCRUD: SolanaCRUDKeypair.publicKey }).rpc()

    const currentCount = await program.account.SolanaCRUD.fetch(SolanaCRUDKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set SolanaCRUD value', async () => {
    await program.methods.set(42).accounts({ SolanaCRUD: SolanaCRUDKeypair.publicKey }).rpc()

    const currentCount = await program.account.SolanaCRUD.fetch(SolanaCRUDKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the SolanaCRUD account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        SolanaCRUD: SolanaCRUDKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.SolanaCRUD.fetchNullable(SolanaCRUDKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
