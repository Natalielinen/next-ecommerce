'use client';

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { AuthCard } from "./auth-card";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, loginSchema } from "@/types/login-schema";


export const LoginForm = () => {

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { handleSubmit } = form;

    const onSubmit = (data: LoginFormType) => {
        console.log(data);
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
                        dfgdfg
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}