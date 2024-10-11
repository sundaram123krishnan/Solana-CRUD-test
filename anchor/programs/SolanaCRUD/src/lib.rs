#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod SolanaCRUD {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanaCRUD>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.SolanaCRUD.count = ctx.accounts.SolanaCRUD.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.SolanaCRUD.count = ctx.accounts.SolanaCRUD.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanaCRUD>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.SolanaCRUD.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanaCRUD<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + SolanaCRUD::INIT_SPACE,
  payer = payer
  )]
  pub SolanaCRUD: Account<'info, SolanaCRUD>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanaCRUD<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub SolanaCRUD: Account<'info, SolanaCRUD>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub SolanaCRUD: Account<'info, SolanaCRUD>,
}

#[account]
#[derive(InitSpace)]
pub struct SolanaCRUD {
  count: u8,
}
