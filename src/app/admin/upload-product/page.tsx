"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import styles from '@/styles/productUploadForm.module.css'

export default function UploadProductPage() {

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
    }, [])

    async function submitWithValidation(e: FormEvent<HTMLFormElement>) {

        setLoading(true)
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const maxImageSize = 2000 // In kilobytes
        const imagesBlob = data.getAll('images') as Blob[]

        for (let i = 0; i < imagesBlob.length; i++) {

            if (imagesBlob[i].type != 'image/png' && imagesBlob[i].type != 'image/jpeg' && imagesBlob[i].type != 'image/webp') {
                console.error('Image Upload Failure: All image files need to be in a png, jpg/jpeg or webp format!')
                return
            }

            if ((imagesBlob[i].size / 1024) > maxImageSize) {
                console.error('Image Upload Failure: All image files need to be less than 2MB in size!')
                return
            }
        }

        const res = await fetch('/admin/dashboard/product/', {
            method: 'POST',
            body: data,
        })

        if (res.ok) {
            router.push('/admin/dashboard')
        } else {
            setLoading(false)
            console.error('The request could not be completed...')
        }
    }

    return (
        <>
            <div className="w-24 mx-auto">
                <Link href='/admin/dashboard'><p className="text-center mt-10 py-3 text-xl bg-black text-white hover:bg-blue-700">Back</p></Link>
            </div>

            <h1 className="text-center mt-12 mb-20 text-3xl">Upload A New Product</h1>

            <form onSubmit={submitWithValidation} className={styles.formLayout}>

                <div className={styles.title}>
                    <label htmlFor="title" className="block">Product Title</label>
                    <input name="title" type="text" placeholder="Enter Title" className="text-center border-2 border-black w-full" required minLength={3} maxLength={120} />
                </div>

                <div className={styles.description}>
                    <label htmlFor="description" className="block">Product Description</label>
                    <textarea name="description" placeholder="Enter Description" className="text-center border-2 border-black w-full" required minLength={3} maxLength={2000} />
                </div>

                <div className={styles.images}>
                    <label htmlFor="images" className="block mb-1">Select the product images</label>
                    <input name="images" type="file" accept="image/png, image/jpeg, image/webp" required multiple />
                </div>

                <div className={styles.stock}>
                    <label htmlFor="stock" className="block">Available Stock</label>
                    <input name="stock" type="number" placeholder="Enter Stock" className="text-center border-2 border-black w-full" required min={0} max={99} />
                    <p className="text-blue-700">If stock is irrelevant, just enter 99</p>
                </div>

                <div className={styles.tags}>
                    <label htmlFor="tags" className="block">Product Tags</label>
                    <input name="tags" placeholder="nintendo, joycon, zelda" className="text-center border-2 border-black w-full" required minLength={2} maxLength={250} />
                    <p>(relevant for user searching and being offered related products)</p>
                    <p className="text-blue-700">Seperate them with a comma.</p>
                </div>

                <div className={styles.priceJPY}>
                    <label htmlFor="price-jpy" className="block">Product Price (JPY)</label>
                    <input name="price-jpy" type="number" placeholder="Enter Japanese Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                </div>

                <div className={styles.priceCAD}>
                    <label htmlFor="price-cad" className="block">Product Price (CAD)</label>
                    <input name="price-cad" type="number" placeholder="Enter Canadian Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.priceUSD}>
                    <label htmlFor="price-usd" className="block">Product Price (USD)</label>
                    <input name="price-usd" type="number" placeholder="Enter American Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.priceGBP}>
                    <label htmlFor="price-gbp" className="block">Product Price (GBP)</label>
                    <input name="price-gbp" type="number" placeholder="Enter British Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.submitButton}>
                    <button type="submit" disabled={isLoading} className="enabled:bg-black enabled:hover:bg-blue-700 enabled:text-white px-10 py-6 disabled:bg-slate-400 disabled:text-black">{isLoading ? 'Loading...' : 'Upload product to database'}</button>
                </div>
            </form>
        </>
    );
}