import { Shojumaru } from 'next/font/google'
import './primaryButton.css'

const shojumaru = Shojumaru({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

type PrimaryButtonProps = {
    buttonText: string
}

export default function PrimaryButton({ buttonText }: PrimaryButtonProps) {
    return (
        <div className='btn-container'>
            <button className={`${shojumaru.className} btn`}>{buttonText}</button>
        </div >
    );
}