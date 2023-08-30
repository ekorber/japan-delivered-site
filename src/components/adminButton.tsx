"use client"

import { MouseEventHandler } from 'react';

type AdminButtonProps = {
    buttonText: string,
    onClickFunction?: MouseEventHandler,
    className?: string,
}

export default function AdminButton({ buttonText, onClickFunction, className }: AdminButtonProps) {
    return (
        <button className={`bg-black text-white hover:bg-blue-700 ${className}`} onClick={onClickFunction}>{buttonText}</button>
    );
}