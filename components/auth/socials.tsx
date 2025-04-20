'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type SocialButtonType = {
    id: number;
    label: string;
    provider: "google" | "github",
    icon: React.ReactNode
}

const buttonConfig: Array<SocialButtonType> = [
    {
        id: 1,
        label: "Sign in with Google",
        provider: "google",
        icon: <FcGoogle />

    },
    {
        id: 2,
        label: "Sign in with Github",
        provider: "github",
        icon: <FaGithub />

    }
]

export default function Socials() {

    const onLogin = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: "/",
            redirect: false
        })
    }

    return (
        <div className="flex flex-col items-center w-full gap-4">
            {
                buttonConfig.map((button) => (
                    <Button
                        key={button.id}
                        onClick={() => onLogin(button.provider)}
                        className="flex gap-4 w-full"
                        variant="outline"
                    >
                        {button.icon}
                        <p>{button.label}</p>
                    </Button>
                ))
            }
        </div>
    )
}