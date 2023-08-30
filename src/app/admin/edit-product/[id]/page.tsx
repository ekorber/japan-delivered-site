"use client"

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
            <h1 className="text-center mt-12 mb-20 text-3xl">Edit An Existing Product</h1>

            <ProductForm requestMethod='PUT' product={product} cancelHref='/admin/dashboard' />
        </>
    );
}