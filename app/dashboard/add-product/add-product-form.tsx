'use client';

import { AddProductFormType, addProductSchema } from "@/types/add-product-schema";
import { useForm } from "react-hook-form";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import Tiptap from "./tipap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createProduct } from "@/server/actions/create-product";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

export default function AddProductForm() {

    const form = useForm<AddProductFormType>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0
        },
        mode: 'onChange'
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const router = useRouter();

    const { execute, status } = useAction(createProduct, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                router.push(`/dashboard/products`);
                toast.success(data?.data?.success);
            }
        },
        onExecute: () => {
            toast.loading("Creating Product...");
        }
    });

    const onSubmit = (data: AddProductFormType) => execute(data);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <Tiptap val={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Price</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={32} className="p-2 bg-muted rounded-md" />
                                            <Input {...field} type="number" placeholder="Product Price" step="0.1" min="0" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={
                                status === "executing"
                                || !form.formState.isValid
                                || !form.formState.isDirty}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}