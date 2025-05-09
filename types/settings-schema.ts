import { z } from 'zod';

export const settingsSchema = z.object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8))
}).refine((data) => {
    if(data.password && !data.newPassword) {
        return false;
    }

    return true;
}, {message: "New password is required", path: ['newPassword']})

export type SettingsFormType = z.infer<typeof settingsSchema>;