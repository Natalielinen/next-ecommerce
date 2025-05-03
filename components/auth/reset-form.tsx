'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { AuthCard } from "./auth-card";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormInfo } from "./form-info";
import { ResetFormType, resetSchema } from "@/types/reset-schema";
import { resetPassword } from "@/server/actions/password-reset";

export const ResetForm = () => {

    const form = useForm<ResetFormType>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: ''
        }
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const { execute, status } = useAction(resetPassword, {
        onSuccess: (data) => {
            if (data?.data?.error) setError(data?.data?.error);
            if (data?.data?.success) setSuccess(data?.data?.success);
        }
    });

    const { handleSubmit, control } = form;

    const onSubmit = (data: ResetFormType) => {
        execute(data);

    };

    return (
        <AuthCard
            cardTitle="Forgot your password?"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
            showSocials
        >
            <div>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" type="email" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormInfo message={success || error} isError={!!error} />
                        </div>
                        <Button
                            type="submit"
                            className={cn(
                                "w-full my-2",
                                status === "executing" ? "animate-pulse" : ""
                            )}
                        >Reset password</Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}