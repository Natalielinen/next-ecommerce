'use server';

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { db } from "..";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


const actionClient = createSafeActionClient();

export const deleteProduct = actionClient
    .schema(z.object({
        id: z.number()
    }))
    .action(async ({ parsedInput: { id } }) => {
        try {
            const data = await db.delete(products).where(eq(products.id, id)).returning();

            revalidatePath('/dashboard/products');

            return {success: `Product ${data[0].title} deleted successfully`};
            
        } catch (error) {
            return {error: JSON.stringify(error)}
        }
    
    });