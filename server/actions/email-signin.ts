'use server';

import { loginSchema } from '@/types/login-schema';
import {createSafeActionClient} from 'next-safe-action';
import { db } from '@/server';
import { eq } from 'drizzle-orm';
import { users } from '../schema';

const actionClient = createSafeActionClient();

export const emailSignin = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: 'Email not found' };
    };

    // if(!existingUser.emailVerified) {
    //   return { error: 'Email not verified' };
    // };

    console.log(email, password, code);
    return { success: { email } };
  });