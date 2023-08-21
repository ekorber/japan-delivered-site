import { prisma } from "@/db";

export async function GET() {
    const products = await prisma.product.findMany({
        skip: 0,
        take: 10
    })

    return new Response(JSON.stringify(products))
}