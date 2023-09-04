import Image from "next/image"

type TinyProductImageProps = {
    url: string,
    deleteImage: Function,
    index: number
}

export default function TinyProductImage({ url, deleteImage, index }: TinyProductImageProps) {

    return (
        <div className='mr-4 w-20 h-20 flex justify-center relative'>
            <Image className="p-2 object-contain" width={64} height={64} src={url} alt='' />
            <button className="bg-black
                                hover:bg-white
                                text-white
                                hover:text-black
                                p-2
                                w-10
                                h-10
                                absolute
                                right-0
                                top-0
                                rounded-lg
                                border-2
                                border-black"
                onClick={(e) => { e.preventDefault(); deleteImage(index); }}>

                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
            </button>
        </div>
    );
}