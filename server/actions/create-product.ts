'use server';

import { addProductSchema } from "@/types/add-product-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";

const actionClient = createSafeActionClient();

export const createProduct = actionClient
    .schema(addProductSchema)
    .action(async ({ parsedInput: { title, price, description, id } }) => {
        try {
            if(id) {
                const currentProduct = await db.query.products.findFirst({
                    where: eq(products.id, id)
                });

                if(!currentProduct) {
                    return {error: "Product not found"}
                }

                const editedProduct = await db.update(products).set({
                    title,
                    price,
                    description
                }).where(eq(products.id, id)).returning();

                return {success: `Product ${editedProduct[0].title} updated successfully`};
            }


            if(!id) {
                const newProduct = await db.insert(products).values({
                    title,
                    price,
                    description
                }).returning();

                return {success: `Product ${newProduct[0].title} created successfully`};
            }

        } catch (error) {
            return {error: JSON.stringify(error)}
        }
    
    });