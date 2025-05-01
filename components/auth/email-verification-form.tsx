'use client';

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AuthCard } from "./auth-card";
import { FormInfo } from "./form-info";

export const EmailVerificationForm = () => {

    const token = useSearchParams().get('token');

    const router = useRouter();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleVerification = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError('Token not found');
            return;
        };

        newVerification(token).then((data) => {
            if (data?.error) setError(data.error);
            if (data?.success) {
                setSuccess(data.success);
                router.push('/auth/login');
            }
        });

    }, []);

    useEffect(() => {
        handleVerification();
    }, []);

    return (
        <AuthCard
            cardTitle="Email verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div
                className="flex items-center flex-col gap-4 w-full justify-center"
            >
                <p>{!success && !error ? 'Verifying email...' : null}</p>
                <FormInfo message={success || error} isError={!!error} />
            </div>
        </AuthCard>
    )
}