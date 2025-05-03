'use server';

import { resetSchema } from "@/types/reset-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generatePasswordResetToken } from "./tokens";
import { sendResetPasswordEmail } from "./emails";

const actionClient = createSafeActionClient();

export const resetPassword = actionClient
  .schema(resetSchema)
  .action(async ({ parsedInput: { email} }) => {
    const exidtingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if(!exidtingUser) {
        return {error: "User not found"}
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    if(!passwordResetToken) {
        return {error: "Token not generated"}
    }

    await sendResetPasswordEmail(passwordResetToken[0].email, passwordResetToken[0].token);

    return {success: 'Reset email was sent'}

  });