import { prisma } from "@/db"
import styles from '@/styles/productUploadForm.module.css'

export async function submitProduct(data: FormData) {
    "use server"

    const title = data.get('title') as string
    const description = data.get('description') as string

    const priceStringJPY = data.get('price-jpy') as string
    const priceJPY = parseInt(priceStringJPY)

    const priceStringCAD = data.get('price-cad') as string
    const priceCAD = parseInt(priceStringCAD)

    const priceStringUSD = data.get('price-usd') as string
    const priceUSD = parseInt(priceStringUSD)

    const priceStringGBP = data.get('price-gbp') as string
    const priceGBP = parseInt(priceStringGBP)


    const MAX_TAGS = 8
    const MAX_TAG_LENGTH = 30

    //String formating for tags
    const tagsString = data.get('tags') as string
    const tags = tagsString.toLowerCase().split(',', MAX_TAGS)
    for (let i = 0; i < tags.length; i++) {
        let temp = tags[i].trim()
        if (temp.length > MAX_TAG_LENGTH) {
            temp = temp.substring(0, MAX_TAG_LENGTH)
        }
        tags[i] = temp
    }

    //Handle stock
    const stockString = data.get('stock') as string
    let stock = 99
    if (stockString) {
        stock = parseInt(stockString)
    }

    await prisma.product.create({
        data: {
            title,
            description,
            imageURLs: [],
            priceJPY,
            priceCAD,
            priceUSD,
            priceGBP,
            stock,
            tags,
        }
    })
}

export default function UploadProductPage() {
    return (
        <>
            <h1 className="text-center my-20 text-3xl">Upload A New Product</h1>
            <form action={submitProduct} method="POST" className={styles.formLayout}>

                <div className={styles.title}>
                    <label htmlFor="title" className="block">Product Title</label>
                    <input name="title" type="text" placeholder="Enter Title" className="text-center border-2 border-black w-full" required />
                </div>

                <div className={styles.description}>
                    <label htmlFor="description" className="block">Product Description</label>
                    <textarea name="description" placeholder="Enter Description" className="text-center border-2 border-black w-full" required />
                </div>

                <div className={styles.stock}>
                    <label htmlFor="stock" className="block">Available Stock (Optional)</label>
                    <input name="stock" type="number" placeholder="Enter Stock" className="text-center border-2 border-black w-full" />
                </div>

                <div className={styles.tags}>
                    <label htmlFor="tags" className="block">Product Tags</label>
                    <input name="tags" placeholder="nintendo, joycon, zelda" className="text-center border-2 border-black w-full" required />
                    <p>(relevant for user searching and being offered related products)</p>
                    <p className="text-blue-700">Seperate them with a comma.</p>
                    <p className="text-blue-700">30 characters max per tag.</p>
                    <p className="text-blue-700">8 tags max.</p>
                </div>

                <div className={styles.priceJPY}>
                    <label htmlFor="price-jpy" className="block">Product Price (JPY)</label>
                    <input name="price-jpy" type="number" placeholder="Enter Japanese Price" className="text-center border-2 border-black w-full" required />
                </div>

                <div className={styles.priceCAD}>
                    <label htmlFor="price-cad" className="block">Product Price (CAD)</label>
                    <input name="price-cad" type="number" placeholder="Enter Canadian Price" className="text-center border-2 border-black w-full" required />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.priceUSD}>
                    <label htmlFor="price-usd" className="block">Product Price (USD) IN CENTS</label>
                    <input name="price-usd" type="number" placeholder="Enter American Price" className="text-center border-2 border-black w-full" required />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.priceGBP}>
                    <label htmlFor="price-gbp" className="block">Product Price (GBP) IN CENTS</label>
                    <input name="price-gbp" type="number" placeholder="Enter British Price" className="text-center border-2 border-black w-full" required />
                    <p className="text-blue-700">Price MUST BE in cents.</p>
                </div>

                <div className={styles.submitButton}>
                    <button type="submit" className="bg-black hover:bg-blue-700 text-white px-10 py-6">Upload product to database</button>
                </div>
            </form>
        </>
    );
}