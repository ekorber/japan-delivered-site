"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import { Product } from "@prisma/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/productUploadForm.module.css'

type ProductFormProps = {
    requestMethod: 'POST' | 'PUT',
    product?: Product,
}

export default function ProductForm({ requestMethod, product }: ProductFormProps) {

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [input, setInput] = useState<Product>({
        id: '',
        title: '',
        description: '',
        images: ([] as Buffer[]),
        priceJPY: 100,
        priceCAD: 100,
        priceUSD: 100,
        priceGBP: 100,
        stock: 99,
        tags: ([] as string[]),
    })
    const [unprocessedTags, setUnprocessedTags] = useState('')


    useEffect(() => {
        if (product) {
            setInput({
                ...input,
                id: product.id,
                title: product.title,
                description: product.description,
                priceJPY: product.priceJPY,
                priceCAD: product.priceCAD,
                priceUSD: product.priceUSD,
                priceGBP: product.priceGBP,
                stock: product.stock
            })
            setUnprocessedTags(product.tags.toString())
        }
    }, [product])

    async function submitWithValidation(e: FormEvent<HTMLFormElement>) {

        setLoading(true)
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        if (requestMethod == 'PUT')
            data.append('id', input.id)

        const maxImageSize = 2000 // In kilobytes
        const imagesBlob = data.getAll('images') as Blob[]

        for (let i = 0; i < imagesBlob.length; i++) {

            if (imagesBlob[0].type == 'application/octet-stream') {
                data.delete('images')
                break
            }

            if (imagesBlob[i].type != 'image/png' && imagesBlob[i].type != 'image/jpeg' && imagesBlob[i].type != 'image/webp') {
                toast.error('Image Upload Failure: All image files need to be in a png, jpg/jpeg or webp format.')
                console.error('Image Upload Failure: All image files need to be in a png, jpg/jpeg or webp format.')
                setLoading(false)
                return
            }

            if ((imagesBlob[i].size / 1024) > maxImageSize) {
                toast.error('Image Upload Failure: All image files need to be less than 2MB in size.')
                console.error('Image Upload Failure: All image files need to be less than 2MB in size.')
                setLoading(false)
                return
            }
        }

        const res = await fetch('/admin/dashboard/product/', {
            method: requestMethod,
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
            <form onSubmit={submitWithValidation} className={styles.formLayout}>

                <div className={styles.title}>
                    <label htmlFor="title" className="block">Product Title</label>
                    <input name="title" type="text" value={input?.title} onChange={(e) => setInput({ ...input, title: e.target.value })} placeholder="Enter Title" className="text-center border-2 border-black w-full" required minLength={3} maxLength={120} />
                </div>

                <div className={styles.description}>
                    <label htmlFor="description" className="block">Product Description</label>
                    <textarea name="description" value={input?.description} onChange={(e) => setInput({ ...input, description: e.target.value })} placeholder="Enter Description" className="text-center border-2 border-black w-full" required minLength={3} maxLength={2000} />
                </div>

                <div className={styles.images}>
                    <label htmlFor="images" className="block mb-1">Select the product images</label>
                    <input name="images" type="file" accept="image/png, image/jpeg, image/webp" required={requestMethod == 'POST'} multiple />
                </div>

                <div className={styles.stock}>
                    <label htmlFor="stock" className="block">Available Stock</label>
                    <input name="stock" type="number" value={input?.stock || undefined} onChange={(e) => setInput({ ...input, stock: parseInt(e.target.value) })} placeholder="Enter Stock" className="text-center border-2 border-black w-full" required min={0} max={99} />
                    <p className="text-blue-700">If stock is irrelevant, just enter 99</p>
                </div>

                <div className={styles.tags}>
                    <label htmlFor="tags" className="block">Product Tags</label>
                    <input name="tags" type="text" value={unprocessedTags} onChange={(e) => setUnprocessedTags(e.target.value)} placeholder="nintendo, joycon, zelda" className="text-center border-2 border-black w-full" required minLength={2} maxLength={250} />
                    <p>(relevant for user searching and being offered related products)</p>
                    <p className="text-blue-700">Seperate them with a comma.</p>
                </div>

                <div className={styles.priceJPY}>
                    <label htmlFor="price-jpy" className="block">Product Price (JPY)</label>
                    <input name="price-jpy" type="number" value={input?.priceJPY || undefined} onChange={(e) => setInput({ ...input, priceJPY: parseInt(e.target.value) })} placeholder="Enter Japanese Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                </div>

                <div className={styles.priceCAD}>
                    <label htmlFor="price-cad" className="block">Product Price (CAD)</label>
                    <input name="price-cad" type="number" value={input?.priceCAD || undefined} onChange={(e) => setInput({ ...input, priceCAD: parseInt(e.target.value) })} placeholder="Enter Canadian Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.priceUSD}>
                    <label htmlFor="price-usd" className="block">Product Price (USD)</label>
                    <input name="price-usd" type="number" value={input?.priceUSD || undefined} onChange={(e) => setInput({ ...input, priceUSD: parseInt(e.target.value) })} placeholder="Enter American Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.priceGBP}>
                    <label htmlFor="price-gbp" className="block">Product Price (GBP)</label>
                    <input name="price-gbp" type="number" value={input?.priceGBP || undefined} onChange={(e) => setInput({ ...input, priceGBP: parseInt(e.target.value) })} placeholder="Enter British Price" className="text-center border-2 border-black w-full" required min={100} max={99999999} />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.submitButton}>
                    <button type="submit" disabled={isLoading || (requestMethod == 'PUT' && !product)} className="enabled:bg-black enabled:hover:bg-blue-700 enabled:text-white px-10 py-6 disabled:bg-slate-400 disabled:text-black">{isLoading ? 'Loading...' : 'Submit product to database'}</button>
                </div>
            </form>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored" />
        </>
    )
}