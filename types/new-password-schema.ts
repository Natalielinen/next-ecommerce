import { z } from 'zod';

export const newPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters',
    }),
    token: z.string().nullable().optional(),
});

export type NewPasswordFormType = z.infer<typeof newPasswordSchema>;