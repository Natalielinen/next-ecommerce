'use client';

import Link from "next/link";
import { Button } from "../ui/button";


type BackButtonProps = {
    href: string;
    label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
    return (
        <Button variant="link" className="font-medium">
            <Link aria-label={label} href={href}>
                {label}
            </Link>
        </Button>
    )

}