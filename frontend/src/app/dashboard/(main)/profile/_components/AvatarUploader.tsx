import React, {useEffect, useRef, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import MaterialSymbolsImageOutline from "@/components/icons/MaterialSymbolsImageOutline";
import Image from "next/image";
import LucideLoaderCircle from "@/components/icons/LucideLoaderCircle";
import {Button} from "@/components/ui/button";

interface ThumbnailUploaderProps {
    image?: string | null,
    title: string | null,
    onImageUpload?: (file: File) => void;
    onImageRemove: () => void;
    loading?: boolean;
    initials?: string | null,
}

const LinkThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({image, initials, loading, title, onImageUpload, onImageRemove}) => {
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

    const handleDelete = () => {
            onImageRemove()
    }

    return (
        <div className={'flex flex-col items-center gap-y-4'}>
            <Avatar onClick={handleClick} className={'min-h-[144px] min-w-[144px] cursor-pointer'}>
                <AvatarImage asChild src={preview || ''}>
                    <Image
                        src={preview || ''}
                        alt={title || ''}
                        width={144}
                        height={144}
                    />
                </AvatarImage>
                <AvatarFallback className={'text-muted-foreground text-4xl bg-muted rounded-lg'}>
                    {initials ? initials :  <MaterialSymbolsImageOutline/>}
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
            <div className={'flex max-md:flex-col gap-2 md:gap-4 w-full'}>
                <Button disabled={loading} className={'w-full'} size={'lg'} rounded onClick={handleClick}>Upload Image</Button>
                <Button disabled={loading || !preview} className={'w-full'} size={'lg'} color={'accent'} variant="outlined" rounded onClick={handleDelete}>Remove</Button>
            </div>
        </div>
    );
};

export default LinkThumbnailUploader;