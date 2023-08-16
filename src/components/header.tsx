import Script from "next/script"
import styles from '@/styles/header.module.css'

export default function Header() {
    return (
        <>
            <Script src="https://kit.fontawesome.com/72723071e2.js" strategy="lazyOnload" />

            <header className={styles.header}>
                <button className={styles.btn}><i className="fa-solid fa-bars"></i></button>
                <input className={styles.searchbar} type="search" placeholder=" What would you like from Japan?" />
                <button className={styles.btn}><i className="fa-solid fa-cart-shopping"></i></button>
            </header>
        </>
    );
}