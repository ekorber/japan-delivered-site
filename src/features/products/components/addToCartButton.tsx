import { useShoppingCart } from "../contexts/shoppingCartContext";

type AddToCardButtonProps = {
    id: string
}

export default function AddToCardButton({ id }: AddToCardButtonProps) {

    const { getItemQuantity, increaseCartQuantity } = useShoppingCart()

    return (
        <button className='h-10 mb-2.5 px-5 bg-primary-red text-center hover:duration-200 hover:bg-primary-red-dark hover:scale-105' onClick={() => increaseCartQuantity(id)}>
            <svg className="mx-auto" width="30" height="30" fill="white" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
            </svg>
        </button>
    );
}