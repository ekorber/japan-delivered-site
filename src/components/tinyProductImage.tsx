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
            <button className="bg-red-600
                                hover:bg-white
                                text-white
                                hover:text-red-600
                                p-2
                                w-10
                                h-10
                                absolute
                                right-0
                                top-0
                                rounded-lg
                                border-2
                                border-red-600"

                onClick={(e) => { e.preventDefault(); deleteImage(index); }}>D</button>
        </div>
    );
}