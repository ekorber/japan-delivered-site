"use client"

import { useEffect, useState } from 'react'
import ProductListItem from './productListItem'
import styles from '@/styles/productList.module.css'
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
        <ul className={styles.product_list}>
            {products.map(product => {
                console.log(new Blob([product.images[0]], { type: 'image/webp' }))
                return (
                    <ProductListItem key={product.id} imageURL={product.images[0]} altText='' productTitle={product.title} />
                )
            })}
        </ul>
    );
}