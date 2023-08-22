"use client"

import { Product } from "@prisma/client";
import AdminButton from "./adminButton";
import { Dispatch, SetStateAction, useState } from "react";

export async function deleteProduct(id: string, removeProduct: Function, setEnabled: Dispatch<SetStateAction<boolean>>) {

    setEnabled(false)

    const res = await fetch('/admin/dashboard/product/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })

    if (res.ok) {
        removeProduct(id)
    }
}

type ProductDashboardTableRowProps = {
    product: Product,
    removeProduct: Function,
}

export default function ProductDashboardTableRow({ product, removeProduct }: ProductDashboardTableRowProps) {
    const [enabled, setEnabled] = useState(true)

    let displayValue = ''
    if (!enabled)
        displayValue = 'hidden'

    return (
        <tr className={`${displayValue} even:bg-blue-300`}>
            <td className="pl-2 border border-black">{product.title}</td>
            <td className="pl-2 border border-black">{product.description}</td>
            <td className="pl-2 border border-black">{product.stock}</td>
            <td className="pl-2 border border-black">{product.tags.toString().replaceAll(',', ', ')}</td>
            <td className="pl-2 border border-black">{product.priceJPY}</td>
            <td className="pl-2 border border-black">{(product.priceCAD / 100).toFixed(2)}</td>
            <td className="pl-2 border border-black">{(product.priceUSD / 100).toFixed(2)}</td>
            <td className="pl-2 border border-black">{(product.priceGBP / 100).toFixed(2)}</td>
            <td className="pl-2 border border-black">
                <AdminButton buttonText="Edit" onClickFunction={() => console.log('Editing: ' + product.id)} className="p-2 m-1" />
                <AdminButton buttonText="Delete" onClickFunction={() => deleteProduct(product.id, removeProduct, setEnabled)} className="p-2 m-1" />
            </td>
        </tr>
    );
}