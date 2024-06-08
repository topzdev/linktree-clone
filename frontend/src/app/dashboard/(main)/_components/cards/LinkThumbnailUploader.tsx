import React, {useEffect, useRef, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import MaterialSymbolsImageOutline from "@/components/icons/MaterialSymbolsImageOutline";
import Image from "next/image";
import LucideLoaderCircle from "@/components/icons/LucideLoaderCircle";

interface ThumbnailUploaderProps {
    image?: string | null,
    title: string | null,
    onImageUpload?: (file: File) => void;
    loading?: boolean;
}

const LinkThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({image, loading, title, onImageUpload}) => {
    const [preview, setPreview] = useState<string | null | undefined>(image);


    useEffect(() =>
    {
        setPreview(image);
    }, [image])

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (onImageUpload) onImageUpload(file);
                e.target.value = "";
            };
            reader.readAsDataURL(file);
        }
    };


    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Avatar onClick={handleClick} className={'h-12 w-12 md:h-16 md:w-16 !rounded-lg cursor-pointer'}>
            {preview && <AvatarImage asChild src={preview}>
                <Image
                    priority
                    src={preview}
                    alt={title || ''}
                    width={64}
                    height={64}
                />
            </AvatarImage>}
            <AvatarFallback className={'text-muted-foreground text-2xl bg-muted rounded-lg'}>
                <MaterialSymbolsImageOutline/>
            </AvatarFallback>
            {
                loading &&
                <div
                    className={'absolute w-full h-full text-2xl bg-black/50 flex items-center justify-center text-white'}>
                    <LucideLoaderCircle className="animate-spin"/>
                </div>
            }
            <input
                hidden
                type="file"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
            />
        </Avatar>
    );
};

export default LinkThumbnailUploader;