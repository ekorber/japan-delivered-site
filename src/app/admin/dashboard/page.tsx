"use client"

import AdminButton from "@/components/adminButton";
import ProductDashboardTableRow from "@/components/productDashboardTableRow";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function AdminDashboardPage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('/admin/dashboard/product-list/', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }, [])

    function removeProductFromTable(id: string) {
        setProducts(products.filter(p =>
            (p as Product).id !== id
        ))
    }

    return (
        <>
            <h1 className="text-center mt-12 mb-20 text-3xl">Dashboard</h1>

            <div className="flex flex-col w-4/5 m-auto">

                <Link href='/admin/upload-product'>
                    <AdminButton buttonText="Create New Product" className="px-3 py-2 mb-3" />
                </Link>

                <table className="text-left">
                    <thead>
                        <tr className="border border-black">
                            <th className="pl-2 bg-black text-white">Title</th>
                            <th className="pl-2 bg-black text-white">Description</th>
                            <th className="pl-2 bg-black text-white">Stock</th>
                            <th className="pl-2 bg-black text-white">Tags</th>
                            <th className="pl-2 bg-black text-white">Price JPY</th>
                            <th className="pl-2 bg-black text-white">Price CAD</th>
                            <th className="pl-2 bg-black text-white">Price USD</th>
                            <th className="pl-2 bg-black text-white">Price GBP</th>
                            <th className="pl-2 bg-black text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return <ProductDashboardTableRow product={product} key={(product as Product).id} removeProduct={removeProductFromTable} />
                        })}
                    </tbody>

                </table>
            </div>
        </>
    );
}