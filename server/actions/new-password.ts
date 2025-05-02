'use server';

import {createSafeActionClient} from 'next-safe-action';
import { newPasswordSchema } from '@/types/new-password-schema';
import { getPasswordResetTokenByToken } from './tokens';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { passwordResetTokens, users } from '../schema';
import bcrypt from 'bcrypt';

const actionClient = createSafeActionClient();

export const newPassword = actionClient
  .schema(newPasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    if(!token) {
        return {error: "Missing token"}
    }

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken) {
        return {error: "Token not found"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return {error: "Token has expired"}
    }

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, existingToken.email),
    });

    if(!existingUser) {
        return {error: "User not found"}

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.transaction(async (tx) => {
        await tx.update(users).set({
            password: hashedPassword,
        })
        .where(eq(users.id, existingUser?.id))

        await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id))
    })

    return {success: "Password updated"}

  });