import { Shojumaru } from 'next/font/google'

const shojumaru = Shojumaru({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

type PrimaryButtonProps = {
    buttonText: string,
    buttonType?: "button" | "submit"
}

export default function PrimaryButton({ buttonText, buttonType }: PrimaryButtonProps) {
    return (
        <div className='mb-2.5 h-10 text-center'>
            <button className={`${shojumaru.className} w-11/12 h-full max-w-lg bg-primary-red text-white text-2xl hover:duration-200 hover:bg-primary-red-dark hover:scale-105`} type={buttonType}>{buttonText}</button>
        </div >
    );
}