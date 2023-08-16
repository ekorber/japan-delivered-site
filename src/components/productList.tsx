import ProductListItem from './productListItem'
import styles from '@/styles/productList.module.css'

export default function () {

    const data = [
        {
            imageURL: '/images/spiderman-comic.jpg',
            productTitle: 'Spiderman Comic',
        },
        {
            imageURL: '/images/batman-comic.jpg',
            productTitle: 'Batman Comic',
        },
        {
            imageURL: '/images/superman-comic.jpg',
            productTitle: 'Superman Comic',
        },
        {
            imageURL: '/images/darth-vader-comic.jpg',
            productTitle: 'Darth Vader Comic',
        },
        {
            imageURL: '/images/captain-america-comic.jpg',
            productTitle: 'Captain America Comic',
        },
    ]

    return (
        <ul className={styles.product_list}>
            {data.map(product => {
                return (
                    <ProductListItem imageURL={product.imageURL} altText='' productTitle={product.productTitle} />
                )
            })}
        </ul>
    );
}