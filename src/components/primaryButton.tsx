import { Shojumaru } from 'next/font/google'

const shojumaru = Shojumaru({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

type PrimaryButtonProps = {
    className?: string,
    buttonText: string,
    buttonType?: "button" | "submit"
}

export default function PrimaryButton({ className, buttonText, buttonType }: PrimaryButtonProps) {
    return (
        <button className={`${shojumaru.className} ${className} mb-2.5 h-10 max-w-lg bg-primary-red text-white text-center text-2xl hover:duration-200 hover:bg-primary-red-dark hover:scale-105`} type={buttonType}>{buttonText}</button>
    );
}