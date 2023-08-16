
import { Shojumaru } from 'next/font/google'
import styles from '@/styles/primaryButton.module.css'

const shojumaru = Shojumaru({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

type PrimaryButtonProps = {
    buttonText: string
}

export default function PrimaryButton({ buttonText }: PrimaryButtonProps) {
    return (
        <div className={styles.btn_container}>
            <button className={`${shojumaru.className} ${styles.btn}`}>{buttonText}</button>
        </div >
    );
}