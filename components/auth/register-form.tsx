'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { AuthCard } from "./auth-card";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { RegisterFormType, registerSchema } from "@/types/register-schema";

export const RegisterForm = () => {

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        }
    });

    //  const { execute, status } = useAction();

    const { handleSubmit, control } = form;

    const onSubmit = (data: RegisterFormType) => {
        //  execute(data);

    };

    return (
        <AuthCard
            cardTitle="Create an account"
            backButtonHref="auth/login"
            backButtonLabel="Already have an account?"
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                type="text"
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
                        </div>
                        <Button
                            type="submit"
                            className={cn(
                                "w-full my-2",
                                status === "executing" ? "animate-pulse" : ""
                            )}
                        >Register</Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}