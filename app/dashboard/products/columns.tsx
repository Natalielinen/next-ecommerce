"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { deleteProduct } from "@/server/actions/delete-product";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

type ProductColumn = {
    title: string,
    price: number,
    image: string,
    variants: string[],
    id: number
}


const ActionCell = ({ row }: { row: Row<ProductColumn> }) => {

    const product = row.original;

    const { execute } = useAction(deleteProduct, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
            }
        },
        onExecute: () => {
            toast.loading("Deleting Product...");
        }
    });

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
                    <Link href={`/dashboard/add-product?id=${product.id}`}>Edit product</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => execute({ id: product.id })}
                    className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer">
                    Delete product
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
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
        cell: ActionCell,
    }
]