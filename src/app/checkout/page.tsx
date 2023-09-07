import { Shojumaru } from 'next/font/google'

const shojumaru = Shojumaru({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

export default function CustomRequest() {

    return (
        <>
            <header className='w-full h-12 bg-primary-red text-white'>
                <p className={`${shojumaru.className} pt-3 pl-5`}>Japan Delivered</p>
            </header>
            <div className="px-10 my-10">
                <h2 className="text-3xl text-center mb-5">Checkout</h2>

            </div>
        </>
    )
}