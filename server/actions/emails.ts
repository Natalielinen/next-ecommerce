'use server';

import getBaseUrl from "@/lib/base-url";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/auth/new-verification?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Next ecommerce confirmation',
        html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email address</p>`,
    });

    if (error) return console.log(error);
    if (data) return console.log(data);
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/auth/new-password?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Next ecommerce confirmation',
        html: `<p>Click <a href="${confirmationLink}">here</a> reset your password</p>`,
    });

    if (error) return console.log(error);
    if (data) return console.log(data);
};