"use client"

import { useEffect, useState } from 'react'
import ProductListItem from './productListItem'
import { Product } from '@prisma/client'

export default function () {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('/admin/dashboard/product-list/', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }, [])

    return (
        <ul className='my-10 px-5 flex flex-col lg:flex-row lg:flex-wrap gap-20 justify-center'>
            {products.map(product => {
                console.log(new Blob([product.images[0]], { type: 'image/webp' }))
                return (
                    <ProductListItem key={product.id} imageURL={product.images[0]} altText='' title={product.title} price={(product.priceCAD / 100).toFixed(2)} />
                )
            })}
        </ul>
    );
}