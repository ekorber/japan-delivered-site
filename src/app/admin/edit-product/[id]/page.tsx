"use client"

import Link from "next/link"
import ProductForm from "@/components/productForm"
import { useEffect, useState } from "react"
import { Product } from "@prisma/client"

export default function EditProductPage({ params }: { params: { id: string } }) {

    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        fetch('/admin/dashboard/product?id=' + params.id, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => setProduct(data))
    }, [])

    return (
        <>
            <div className="w-24 mx-auto">
                <Link href='/admin/dashboard'><p className="text-center mt-10 py-3 text-xl bg-black text-white hover:bg-blue-700">Back</p></Link>
            </div>

            <h1 className="text-center mt-12 mb-20 text-3xl">Edit An Existing Product</h1>

            <ProductForm requestMethod='PUT' product={product} />
        </>
    );
}