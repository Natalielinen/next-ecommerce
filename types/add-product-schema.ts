import { z } from 'zod';

export const addProductSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(5, {
        message: 'Title must be at least 5 characters',
    }),
    description: z.string().min(40, {
        message: 'Description must be at least 40 characters',
    }),
    price: z.coerce.number().positive({
        message: 'Price must be a positive number',
    })
});

export type AddProductFormType = z.infer<typeof addProductSchema>;