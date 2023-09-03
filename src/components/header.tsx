export default function Header() {
    return (
        <>
            <header className='w-full h-12 py-2.5 flex bg-primary-red justify-center'>
                <button className='bg-primary-red text-center text-white basis-16 relative border-none mt-[-1px] text-2xl'><i className="fa-solid fa-bars  hover:duration-200 hover:scale-125"></i></button>
                <input className='max-w-lg grow' type="search" placeholder=" What would you like from Japan?" />
                <button className='bg-primary-red text-center text-white basis-16 relative border-none mt-[-2px] text-2xl'><i className="fa-solid fa-cart-shopping hover:duration-200 hover:scale-125"></i></button>
            </header>
        </>
    );
}