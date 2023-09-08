import CartIconButton from "@/features/products/components/cartIconButton";

export default function Header() {
    return (
        <>
            <header className='w-full h-12 py-2.5 flex bg-primary-red justify-center'>
                <button className='bg-primary-red basis-8 mt-[-2px] mx-3'>
                    <svg width="32" height="32" fill="white" className="hover:duration-200 hover:scale-125" viewBox="0 0 16 16">
                        <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>

                <input className='max-w-lg grow' type="search" placeholder="  What would you like from Japan?" />

                <CartIconButton />
            </header>
        </>
    );
}