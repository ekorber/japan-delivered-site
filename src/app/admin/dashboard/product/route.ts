import { prisma } from '@/db'

export async function GET(req: Request) {
    return new Response('Fetching array of products !')
}

export async function POST(data: FormData) {
    return new Response('Create new product!')
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