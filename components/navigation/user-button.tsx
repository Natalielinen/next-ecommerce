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

export const UserButton = ({ user }: Session) => {
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
                    <DropdownMenuItem className="cursor-pointer"><Truck /> My orders</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer"><Settings /> Settings</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <div className="flex items-center ">
                            <Sun />
                            <Moon />
                            <p>Theme <span>theme</span> </p>
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