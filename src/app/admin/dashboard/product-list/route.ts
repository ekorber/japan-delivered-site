import { prisma } from "@/db";

export async function GET() {
    const products = await prisma.product.findMany({
        skip: 0,
        take: 10,
        orderBy: {
            'title': 'asc'
        }
    })

    return new Response(JSON.stringify(products))
}