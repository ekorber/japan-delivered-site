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

            <button className='bg-primary-red basis-6 mt-[-2px] mx-3'>
                <svg width="26" height="26" fill="white" className="hover:duration-200 hover:scale-125" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
            </button>
        </header>
    )
}