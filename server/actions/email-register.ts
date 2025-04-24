'use server';

import {createSafeActionClient} from 'next-safe-action';
import { db } from '@/server';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { registerSchema } from '@/types/register-schema';
import bcrypt from 'bcrypt';

const actionClient = createSafeActionClient();

export const emailRegister = actionClient
    .schema(registerSchema)
    .action(async ({ parsedInput: { email, password, name } }) => {

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(email, hashedPassword, name);
        

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (existingUser) {
            if(!existingUser.emailVerified) {
                const verificationToken = await bcrypt.hash(email, 10);
                return { error: 'Email not verified' };
            }
            return { error: 'Email already exists' };
        };

        return { success: 'success'};
        
    })