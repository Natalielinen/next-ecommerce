import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters',
    }),
    name: z.string().min(1, {
        message: 'Name is required',
    })
});

export type RegisterFormType = z.infer<typeof registerSchema>;