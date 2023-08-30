import Image from "next/image"

type TinyProductImageProps = {
    url: string,
}

export default function TinyProductImage({ url }: TinyProductImageProps) {
    return (
        <div className='mr-4 w-20 h-20 flex justify-center'>
            <Image className="p-2 object-contain" width={64} height={64} src={url} alt='' />
        </div>
    );
}