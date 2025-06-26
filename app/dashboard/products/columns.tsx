"use client"

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

type ProductColumn = {
    title: string,
    price: number,
    image: string,
    variants: string[],
    id: number
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'vatiants',
        header: 'Variants',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));

            const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);

            return (
                <div className="text-small font-medium">{formattedPrice}</div>
            );
        },
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const image = row.getValue('image') as string;
            const title = row.getValue('title') as string;

            return (
                <div className="">
                    <Image
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full rounded-md"
                        width={50}
                        height={50}
                    />
                </div>
            );
        }
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer"
                        >
                            Edit product
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer">
                            Delete product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]