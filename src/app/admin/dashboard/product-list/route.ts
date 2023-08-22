import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const property = req.nextUrl.searchParams.get('property') as string
    const order = req.nextUrl.searchParams.get('order') as Prisma.SortOrder

    let orderObj: Prisma.ProductOrderByWithRelationInput | undefined
    switch (property) {
        case 'id': orderObj = { id: order };
        case 'title': orderObj = { title: order };
        case 'price-jpy': orderObj = { priceJPY: order };
        case 'stock': orderObj = { id: order };
    }

    const products = await prisma.product.findMany({
        skip: 0,
        take: 10,
        orderBy: orderObj
    })

    return new Response(JSON.stringify(products))
}