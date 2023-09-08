'use client'
import Link from "next/link";
import { useShoppingCart } from "../contexts/shoppingCartContext";

export default function CartIconButton() {

    const { totalCartQuantity } = useShoppingCart()

    const quantity = totalCartQuantity

    let leftSpacing = 'left-10'
    if (quantity > 9)
        leftSpacing = 'left-9'

    return (
        <Link href='/cart' className="relative">
            <button className='bg-primary-red text-white basis-6 mt-[-2px] mx-3'>
                <svg width="45" height="30" fill="white" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    {quantity > 0 && <circle cx='13' cy='6.5' r="6" fill="red" />}
                </svg>
            </button>
            <p className={`text-white text-center text-xs absolute top-0.5 ${leftSpacing}`}>{quantity > 0 && quantity}</p>
        </Link >
    )
}