
import { Shojumaru } from 'next/font/google'
import styles from '@/styles/primaryButton.module.css'

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
        <div className={styles.btn_container}>
            <button className={`${shojumaru.className} ${styles.btn}`} type={buttonType}>{buttonText}</button>
        </div >
    );
}