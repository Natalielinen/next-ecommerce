'use server';

import { db } from "@/server";
import { eq } from "drizzle-orm";
import { emailTokens, passwordResetTokens, users } from "../schema";

export const gerVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens.id, email),
        });

        return verificationToken;

    } catch (error) {
        console.error(error);
        return null;

    }
};

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID();

    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const existingToken = await gerVerificationTokenByEmail(email);

    if(existingToken) {
        await db.delete(emailTokens).where(eq(emailTokens.id, email));
    }

    const verificationToken = await db.insert(emailTokens).values({
        token,
        expires,
        email
    })
    .returning();

    return verificationToken;

};

export const newVerification = async (token: string) => {
    const existingToken = await gerVerificationTokenByEmail(token);

    if (!existingToken) return { error: 'Token not found' };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error: 'Token has expired' };

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, existingToken.email),
    });

    if (!existingUser) return { error: 'User not found' };

    await db.update(users)
        .set({ 
            emailVerified: new Date(),
            email: existingToken.email,
         })
        .where(eq(users.email, existingToken.email));

    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));   
    
    return { success: 'Email verified' };

}

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.query.passwordResetTokens.findFirst({
            where: eq(passwordResetTokens.token, token),
        });

        return passwordResetToken;

    } catch {
        return null;
    }
}