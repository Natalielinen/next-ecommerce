'use server';

import { settingsSchema } from '@/types/settings-schema';
import {createSafeActionClient} from 'next-safe-action';
import { auth } from '../auth';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

const actionClient = createSafeActionClient();

export const settings = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput: { 
    name,
    image,
    email,
    newPassword, 
    password
  } }) => {
    const user = await auth();

    if(!user) {
        return {error: "User not found"}
    }

    const dbUser = await db.query.users.findFirst({
        where: eq(users.id, user.user.id)
    });

    if(!dbUser) {
        return {error: "User not found"}
    }

    if(user.user.isOAuth) {
        email = undefined;
        password = undefined;
        newPassword = undefined;
    }

    if(password && newPassword && dbUser.password) {
        const passwodrMatch = await bcrypt.compare(password, dbUser.password);

        if(!passwodrMatch) {
            return {error: "Password does not match"}
        }

        const samePassword = await bcrypt.compare(newPassword, dbUser.password);

        if(!samePassword) {
            return {error: "New password is the same as old password"}
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        password = hashPassword;
        newPassword = undefined;

    }

     const updateUser = await db.update(users).set({
        name,
        password,
        email,
        image
    }).where(eq(users.id, user.user.id));

    revalidatePath("/dashboard/settings");
    return {success: "Settings updated"}


  });