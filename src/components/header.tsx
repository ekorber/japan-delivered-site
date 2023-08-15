import Script from "next/script";
import './header.css'

export default function Header() {
    return (
        <>
            <Script src="https://kit.fontawesome.com/72723071e2.js" strategy="lazyOnload" />

            <header className="header">
                <button className="btn menu-btn"><i className="fa-solid fa-bars"></i></button>
                <input className="searchbar" type="search" placeholder=" What would you like from Japan?" />
                <button className="btn cart-btn"><i className="fa-solid fa-cart-shopping"></i></button>
            </header>
        </>
    );
}