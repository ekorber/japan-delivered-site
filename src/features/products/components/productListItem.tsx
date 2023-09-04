import Image from "next/image"
import PrimaryButton from "../../../components/primaryButton";
import AddToCardButton from "./addToCartButton";

type ProductListItemProps = {
    imageURL: string,
    altText: string,
    title: string,
    price: string
}

export default function ProductListItem({ imageURL, altText, title, price }: ProductListItemProps) {
    return (
        <li className=''>
            <Image className='mx-auto h-72 object-contain' src={imageURL} width={280} height={280} alt={altText} />
            <p className='text-center uppercase mt-3.5 mb-1'>{title}</p>
            <p className='text-center text-lg mb-3.5'><strong>${price}</strong></p>
            <div className="flex justify-center gap-2">
                <AddToCardButton />
                <PrimaryButton className='px-10' buttonText="Similar to this" />
            </div>
        </li>
    );
}