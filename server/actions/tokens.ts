'use server';

import { db } from "@/server";
import { eq } from "drizzle-orm";
import { emailTokens } from "../schema";

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