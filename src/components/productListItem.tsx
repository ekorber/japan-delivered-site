import Image from "next/image"
import styles from '@/styles/productListItem.module.css'

type ProductListItemProps = {
    imageURL: string,
    altText: string,
    productTitle: string
}

export default function ProductListItem({ imageURL, altText, productTitle }: ProductListItemProps) {
    return (
        <li className={styles.product_card}>
            <Image className={styles.product_img} src={imageURL} width={280} height={280} alt={altText} />
            <h2 className={styles.product_title}>{productTitle}</h2>
        </li>
    );
}