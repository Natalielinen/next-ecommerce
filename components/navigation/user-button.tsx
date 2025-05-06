'use client';

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, Truck } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export const UserButton = ({ user }: Session) => {

    const { setTheme, theme } = useTheme();
    const [checked, setChecked] = useState(false);

    const router = useRouter();

    if (user) {
        return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                    <Avatar>
                        {
                            (user.image && user.name) && <AvatarImage>
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    fill
                                />
                            </AvatarImage>
                        }
                        {
                            (!user.image && user.name) && <AvatarFallback>{user.name[0]}</AvatarFallback>
                        }
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-6" align="end">
                    <div className="mb-4 p-4 flex flex-col gap-1 items-center bg-primary/10">
                        <Avatar>
                            {
                                (user.image && user.name) && <AvatarImage>
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        fill
                                    />
                                </AvatarImage>
                            }
                            {
                                (!user.image && user.name) && <AvatarFallback>{user.name[0]}</AvatarFallback>
                            }

                        </Avatar>
                        <p className="font-bold text-xs">{user.name}</p>
                        <span className="text-xs font-medium text-balance">
                            {user.email}
                        </span>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push('/dashboard/orders')}
                    >
                        <Truck /> My orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push('/dashboard/settings')}
                    >
                        <Settings /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" >
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {
                                theme === "light" ? <Moon /> : <Sun />
                            }

                            <p>Theme <span>{theme}</span> </p>
                            <Switch checked={checked} onCheckedChange={(e) => {
                                setChecked((prev) => !prev);
                                if (e) setTheme("dark");
                                if (!e) setTheme("light");
                            }} />
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                        <LogOut />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        )

    }

}