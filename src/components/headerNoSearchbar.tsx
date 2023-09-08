import CartIconButton from '@/features/products/components/cartIconButton'
import { Shojumaru } from 'next/font/google'

const shojumaru = Shojumaru({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

export default function HeaderNoSearchbar() {
    return (
        <header className='w-full h-12 py-2.5 flex bg-primary-red justify-center'>
            <button className='bg-primary-red basis-8 mt-[-2px] mx-3'>
                <svg width="32" height="32" fill="white" className="hover:duration-200 hover:scale-125" viewBox="0 0 16 16">
                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>

            <p className={`${shojumaru.className} pt-0.5 pl-5 text-white grow`}>Japan Delivered</p>

            <CartIconButton />
        </header>
    )
}