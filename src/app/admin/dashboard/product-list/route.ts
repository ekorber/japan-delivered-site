import { prisma } from "@/db";
import { getS3Url } from "@/lib/awsHandler";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    try {
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

        for (let j = 0; j < products.length; j++) {
            //Get the image urls
            for (let i = 0; i < (products[j].images as string[]).length; i++) {
                products[j].images[i] = await getS3Url(products[j].images[i])
            }
        };


        return new Response(JSON.stringify(products))

    } catch (err) {
        const errorResponseOptions = { status: 500, statusText: "Error 500: Internal Server Error!" };
        return new Response('', errorResponseOptions);
    }
}