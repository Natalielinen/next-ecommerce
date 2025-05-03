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
import { NewPasswordFormType, newPasswordSchema } from "@/types/new-password-schema";
import { newPassword } from "@/server/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {

    const form = useForm<NewPasswordFormType>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: '',
        }
    });

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const { execute, status } = useAction(newPassword, {
        onSuccess: (data) => {
            if (data?.data?.error) setError(data?.data?.error);
            if (data?.data?.success) setSuccess(data?.data?.success);
        }
    });

    const { handleSubmit, control } = form;

    const onSubmit = (data: NewPasswordFormType) => {
        execute({ password: data.password, token });
    };

    return (
        <AuthCard
            cardTitle="Enter a new password"
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field} />
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