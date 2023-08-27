import { MAX_IMAGES_PER_PRODUCT } from '@/data/productData'
import { prisma } from '@/db'
import { getS3Url, s3Delete, s3Put } from '@/lib/awsHandler'
import { getManyRandomNames } from '@/lib/cryptoHandler'
import { validateUploadedImages } from '@/utils/imageHandler'
import { Product } from '@prisma/client'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const product = await prisma.product.findUnique({
        where: {
            id: req.nextUrl.searchParams.get('id') as string
        }
    })

    //Get the image urls
    for (let i = 0; i < (product?.images as string[]).length; i++) {
        (product as Product).images[i] = await getS3Url(product?.images[i] as string)
    }

    return new Response(JSON.stringify(product))
}

export async function POST(req: Request) {
    const data = await req.formData()
    let imagesBlob: Blob[] = []

    for (let i = 0; i < parseInt(data.get('numNewImages') as string); i++) {
        imagesBlob.push(data.get('images[' + i + ']') as Blob)
    }

    //Error checking for min & max images
    if (imagesBlob.length > MAX_IMAGES_PER_PRODUCT || imagesBlob.length == 0) {
        return
    }

    //More error checking
    if (!validateUploadedImages(imagesBlob)) {
        return
    }

    const imageNames = getManyRandomNames(imagesBlob.length)

    //Upload to AWS
    for (let i = 0; i < imagesBlob.length; i++) {
        await s3Put(imagesBlob[i], imageNames[i])
    }

    //String formating for tags
    const tagsString = data.get('tags') as string
    const tagsArray = tagsString.toLowerCase().split(',')
    const tags = []
    for (let i = 0; i < tagsArray.length; i++) {
        let temp = tagsArray[i].trim()
        if (temp) {
            tags.push(temp)
        }
    }


    await prisma.product.create({
        data: {
            title: data.get('title') as string,
            description: data.get('description') as string,
            images: imageNames,
            priceJPY: parseInt(data.get('price-jpy') as string),
            priceCAD: parseInt(data.get('price-cad') as string),
            priceUSD: parseInt(data.get('price-usd') as string),
            priceGBP: parseInt(data.get('price-gbp') as string),
            stock: parseInt(data.get('stock') as string),
            tags,
        }
    })

    return new Response()
}

export async function PUT(req: NextRequest) {
    const data = await req.formData()
    let newImageNames: string[] = []
    let productToUpdate;

    let imagesBlob: Blob[] = []
    for (let i = 0; i < parseInt(data.get('numNewImages') as string); i++) {
        imagesBlob.push(data.get('images[' + i + ']') as Blob)
    }

    if (imagesBlob) {
        //Error checking for images
        if (!validateUploadedImages(imagesBlob))
            return

        //Get product
        productToUpdate = await prisma.product.findUnique({
            where: {
                id: data.get('id') as string
            }
        })

        let numPreExistingProductImages = 0
        if (productToUpdate?.images.length)
            numPreExistingProductImages = productToUpdate.images.length

        //Error checking for max images
        if (imagesBlob.length + numPreExistingProductImages > MAX_IMAGES_PER_PRODUCT || imagesBlob.length + numPreExistingProductImages == 0) {
            return
        }

        //Create image names
        newImageNames = getManyRandomNames(imagesBlob.length)

        //Upload new images to AWS
        for (let i = 0; i < imagesBlob.length; i++) {
            await s3Put(imagesBlob[i], newImageNames[i])
        }

        //If pre-existing images exist, add them to the array
        newImageNames = newImageNames.concat(productToUpdate?.images as string[])
    }

    //String formating for tags
    const tagsString = data.get('tags') as string
    const tagsArray = tagsString.toLowerCase().split(',')
    const tags = []
    for (let i = 0; i < tagsArray.length; i++) {
        let temp = tagsArray[i].trim()
        if (temp) {
            tags.push(temp)
        }
    }

    let updateData;
    if (imagesBlob) {
        updateData = {
            title: data.get('title') as string,
            description: data.get('description') as string,
            images: newImageNames,
            priceJPY: parseInt(data.get('price-jpy') as string),
            priceCAD: parseInt(data.get('price-cad') as string),
            priceUSD: parseInt(data.get('price-usd') as string),
            priceGBP: parseInt(data.get('price-gbp') as string),
            stock: parseInt(data.get('stock') as string),
            tags,
        }
    } else {
        updateData = {
            title: data.get('title') as string,
            description: data.get('description') as string,
            priceJPY: parseInt(data.get('price-jpy') as string),
            priceCAD: parseInt(data.get('price-cad') as string),
            priceUSD: parseInt(data.get('price-usd') as string),
            priceGBP: parseInt(data.get('price-gbp') as string),
            stock: parseInt(data.get('stock') as string),
            tags,
        }
    }


    await prisma.product.update({
        where: {
            id: data.get('id') as string,
        },
        data: updateData
    })

    return new Response()
}

export async function DELETE(req: Request) {
    const body = await req.json()

    const productToDelete = await prisma.product.findUnique({
        where: {
            id: body.id
        }
    })

    for (let i = 0; i < (productToDelete?.images as string[]).length; i++) {
        await s3Delete(productToDelete?.images[i] as string)
    };

    await prisma.product.delete({
        where: {
            id: body.id
        }
    })

    return new Response(JSON.stringify({
        id: body.id
    }))
}