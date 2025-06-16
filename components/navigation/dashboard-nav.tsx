'use client';

import { cn } from "@/lib/utils";
import { BarChart, Package, PenSquare, Settings, Truck } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({ session }: { session: Session | null }) {

    const pathName = usePathname();

    const userLinks = [
        {
            label: 'Orders',
            path: '/dashboard/orders',
            icon: <Truck size={16} />
        },
        {
            label: 'Settings',
            path: '/dashboard/settings',
            icon: <Settings size={16} />
        }
    ] as const;

    const adminLinks = session?.user?.role === 'admin' ? [
        {
            label: 'Analytics',
            path: '/dashboard/analytics',
            icon: <BarChart size={16} />
        },
        {
            label: 'Create',
            path: '/dashboard/add-product',
            icon: <PenSquare size={16} />
        },
        {
            label: 'Products',
            path: '/dashboard/products',
            icon: <Package size={16} />
        },
    ] : [];


    const allLinks = [...adminLinks, ...userLinks];

    return (
        <nav className="py-2 overflow-auto">
            <ul className="flex gap-6 text-sm font-bold">
                {allLinks.map((link) => (
                    <li key={link.path}>
                        <Link
                            className={cn(
                                'flex gap-1 flex-col items-center',
                                pathName === link.path ? (
                                    'underline underline-offset-4 decoration-primary text-primary'
                                ) : (
                                    'text-muted-foreground'
                                )
                            )}
                            href={link.path}
                        >
                            {link.icon} {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}