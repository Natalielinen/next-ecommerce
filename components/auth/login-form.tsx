'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { AuthCard } from "./auth-card";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, loginSchema } from "@/types/login-schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { emailSignin } from "@/server/actions/email-signin";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";


export const LoginForm = () => {

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { execute, status } = useAction(emailSignin);

    const { handleSubmit, control } = form;

    const onSubmit = (data: LoginFormType) => {
        execute(data);

    };

    return (
        <AuthCard
            cardTitle="Welcome back!"
            backButtonHref="/auth/register"
            backButtonLabel="Create a new account"
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                autoComplete="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <Button variant="link" size="sm" type="button" asChild>
                                <Link href="/auth/reset">Forgot your password</Link>
                            </Button>
                        </div>
                        <Button
                            type="submit"
                            className={cn(
                                "w-full my-2",
                                status === "executing" ? "animate-pulse" : ""
                            )}
                        >Login</Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}