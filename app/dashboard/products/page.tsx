import { db } from "@/server"
import placeholder from '@/public/placeholder-image.jpg'
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Products() {

    const products = await db.query.products.findMany({
        orderBy: (products, { desc }) => [desc(products.id)]
    });

    if (!products) throw new Error('Products not found');

    const dataTable = products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        created: product.created,
        price: product.price,
        variants: [],
        image: placeholder.src
    }));

    if (!dataTable) throw new Error('Data not found');

    return (
        <DataTable columns={columns} data={dataTable} />
    )
}