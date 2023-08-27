import Image from "next/image"

type TinyProductImageProps = {
    url: string,
}

export default function TinyProductImage({ url }: TinyProductImageProps) {
    return (
        <div className='mr-4 mt-1 inline-block'>
            <Image className='' loading="lazy" width={32} height={32} src={url} alt='' style={{ objectFit: "contain" }} />
        </div>
    );
}