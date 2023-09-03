import Image from "next/image"

type ProductListItemProps = {
    imageURL: string,
    altText: string,
    productTitle: string
}

export default function ProductListItem({ imageURL, altText, productTitle }: ProductListItemProps) {
    return (
        <li className='snap-center snap-always'>
            <Image className='object-contain mx-auto' src={imageURL} width={280} height={280} alt={altText} />
            <h2 className='text-center uppercase font-medium mt-2.5 mb-3.5'>{productTitle}</h2>
        </li>
    );
}