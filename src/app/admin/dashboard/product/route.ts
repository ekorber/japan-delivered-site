import { prisma } from '@/db'

export async function GET(req: Request) {
    return new Response('Fetching array of products !')
}

export async function POST(req: Request) {

    const data = await req.formData()

    const imagesBlob = data.getAll('images') as Blob[]
    let images: Buffer[] = []
    for (let i = 0; i < imagesBlob.length; i++) {

        if (imagesBlob[i].type != 'image/png' && imagesBlob[i].type != 'image/jpeg' && imagesBlob[i].type != 'image/webp') {
            console.log('Image Upload Failure: All image files need to be in a png, jpg/jpeg or webp format!')
            return
        }

        const maxImageSize = 2000 // In kilobytes
        if ((imagesBlob[i].size / 1024) > maxImageSize) {
            console.log('Image Upload Failure: All image files need to be less than 2MB in size!')
            return
        }

        images.push(Buffer.from(await imagesBlob[i].arrayBuffer()))
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
            images,
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

export async function PUT(data: FormData) {
    return new Response('Edit existing product!')
}

export async function DELETE(req: Request) {
    const body = await req.json()
    await prisma.product.delete({
        where: {
            id: body.id
        }
    })
    return new Response(JSON.stringify({
        id: body.id
    }))
}