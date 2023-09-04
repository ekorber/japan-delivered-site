import { MAX_IMAGES_PER_PRODUCT } from '@/features/products/data/productData'
import { prisma } from '@/db'
import { getS3Url, s3Delete, s3Put } from '@/services/aws'
import { getManyRandomNames } from '@/lib/crypto'
import { validateUploadedImages } from '@/utils/imageHandler'
import { Product } from '@prisma/client'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.nextUrl.searchParams.get('id') as string
            }
        })

        const imageNames = (product as Product).images as string[]

        //Get the image urls
        for (let i = 0; i < imageNames.length; i++) {
            imageNames[i] = await getS3Url(imageNames[i] as string)
        }

        return new Response(JSON.stringify(product))

    } catch (err) {
        const errorResponseOptions = { status: 500, statusText: "Error 500: Internal Server Error!" };
        return new Response('', errorResponseOptions);
    }
}


export async function POST(req: Request) {

    try {
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

    } catch (err) {
        const errorResponseOptions = { status: 500, statusText: "Error 500: Internal Server Error!" };
        return new Response('', errorResponseOptions);
    }
}


export async function PUT(req: NextRequest) {

    try {
        const data = await req.formData()
        let newImageNames: string[] = []
        let productToUpdate
        let imageList: string[] = []

        let imageIndicesToDelete: number[] = []
        for (let i = 0; i < parseInt(data.get('numURLIndices') as string); i++) {
            imageIndicesToDelete.push(parseInt(data.get('urlIndex[' + i + ']') as string))
        }

        let imagesBlob: Blob[] = []
        for (let i = 0; i < parseInt(data.get('numNewImages') as string); i++) {
            imagesBlob.push(data.get('images[' + i + ']') as Blob)
        }


        //If images are being added or deleted
        if (imageIndicesToDelete || imagesBlob) {

            //Get product
            productToUpdate = await prisma.product.findUnique({
                where: {
                    id: data.get('id') as string
                }
            })

            const numPreExistingProductImages = (productToUpdate as Product).images.length
            imageList = imageList.concat((productToUpdate as Product).images)

            //Error checking for max images
            if (imagesBlob.length + numPreExistingProductImages - imageIndicesToDelete.length > MAX_IMAGES_PER_PRODUCT
                || imagesBlob.length + numPreExistingProductImages - imageIndicesToDelete.length <= 0) {
                return
            }

            //If pre-existing images exist, add them to the array
            newImageNames = newImageNames.concat(imageList)
        }


        //Handle image deletion
        if (imageIndicesToDelete) {

            const imageNameDeletionList: string[] = []

            //Create list of image names to delete
            for (let i = 0; i < imageIndicesToDelete.length; i++) {
                imageNameDeletionList.push(imageList[imageIndicesToDelete[i]])
            }

            //Delete images from AWS
            for (let i = 0; i < imageNameDeletionList.length; i++) {
                await s3Delete(imageNameDeletionList[i])
                newImageNames = newImageNames.filter(name => name !== imageNameDeletionList[i])
            }
        }


        //Handle new images
        if (imagesBlob) {

            //Error checking for images
            if (!validateUploadedImages(imagesBlob))
                return

            //Generate image names
            const imageNameAdditions: string[] = getManyRandomNames(imagesBlob.length)
            newImageNames = newImageNames.concat(imageNameAdditions)

            //Upload new images to AWS
            for (let i = 0; i < imagesBlob.length; i++) {
                await s3Put(imagesBlob[i], imageNameAdditions[i])
            }
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

        //Setup new data object
        let updateData;
        if (imageIndicesToDelete || imagesBlob) {
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

    } catch (err) {
        const errorResponseOptions = { status: 500, statusText: "Error 500: Internal Server Error!" };
        return new Response('', errorResponseOptions);
    }
}


export async function DELETE(req: Request) {

    try {
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

    } catch (err) {
        const errorResponseOptions = { status: 500, statusText: "Error 500: Internal Server Error!" };
        return new Response('', errorResponseOptions);
    }
}
