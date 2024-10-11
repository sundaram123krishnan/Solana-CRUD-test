
use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod student_data_module {
    use super::*;

    pub fn create_student(ctx: Context<Initialize>, name: String, roll_no: u32, course_name: String) -> Result<()> {
      let student_id = ctx.accounts.student_details.key();
      let student_data = &mut ctx.accounts.student_details;
      student_data.student_id = student_id;
      student_data.student_name = name;
      student_data.student_roll_no = roll_no;
      student_data.student_course_name = course_name;

      Ok(())
    }


    pub fn update_student(ctx: Context<UpdateStudentData>, new_name: String, new_roll_no: u32, new_course_name: String) -> Result<()> {

      let new_student_data = &mut ctx.accounts.student_update;
      new_student_data.student_name = new_name;
      new_student_data.student_roll_no = new_roll_no;
      new_student_data.student_course_name = new_course_name;
      Ok(())
    }

    pub fn delete_student(_ctx: Context<DeleteStudentData>) -> Result<()> {
      Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
  #[account(init, payer = signer, space = size_of::<StudentData>() + 8)]
  pub student_details: Account<'info, StudentData>,
  #[account(mut)]
  pub signer: Signer<'info>,
  pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct UpdateStudentData<'info> {
  #[account(mut)]
  pub student_update: Account<'info, StudentData>,
}


#[derive(Accounts)]
pub struct DeleteStudentData<'info> {
  #[account(mut, close = signer)]
  pub student_delete: Account<'info, StudentData>,
  #[account(mut)]
  pub signer: Signer<'info>,
}

#[account]
pub struct StudentData {
  student_id: Pubkey,
  student_name: String,
  student_roll_no: u32,
  student_course_name: String
}