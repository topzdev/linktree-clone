import React, {useRef, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import MaterialSymbolsImageOutline from "@/components/icons/MaterialSymbolsImageOutline";
import Image from "next/image";

interface ThumbnailUploaderProps {
    image?: string | null,
    title: string | null,
    onImageUpload?: (file: File) => void;
}

const LinkThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({image, title, onImageUpload }) => {
    const [preview, setPreview] = useState<string | null | undefined>(image)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
               if (onImageUpload) onImageUpload(file);
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
        <Avatar onClick={handleClick} className={'h-16 w-16 !rounded-lg cursor-pointer'}>
            {preview && <AvatarImage asChild src={preview}>
                <Image
                    priority
                    src={preview}
                    alt={title}
                    width={64}
                    height={64}
                />
            </AvatarImage>}
            <AvatarFallback className={'text-muted-foreground text-2xl bg-muted rounded-lg'}>
                <MaterialSymbolsImageOutline/>
            </AvatarFallback>
            <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
            />
        </Avatar>
    );
};

export default LinkThumbnailUploader;