import {ButtonStyleTypes} from "@/data/buttons-style";

export type AppearanceSettings = {
    id: number;
    created_at: string;
    updated_at: string;
    bg_color: string | null;
    bg_color2: string | null;
    bg_position: string | null;
    bg_image: string | null;
    bg_video: string | null;
    btn_color: string;
    btn_style: string | null;
    btn_text_color: string | null;
    btn_shadow_color: string | null;
    profile_bio: string;
    profile_image_style: string;
    profile_title: string;
    profile_avatar: string;
    profile_initials: string | null
    font_color: string | null;
    font_style: string | null;
    bg_id: number;
    btn_id: number;
    font_id: number;
    theme_id: number | null;
    user_id: number;
    profile_avatar_url: string;
    bg_image_url: string | null;
    bg_video_url: string | null;
    font?: Font;
    button?: Button;
    background?: Background;
    theme?: any | null;
}

export type Font = {
    id: number;
    key: string;
    title: string;
    font_size: string;
    font_weight: string;
    letter_spacing: string;
    group_id: number;
    created_at: string | null;
    updated_at: string | null;
}

export type Button = {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    title: string;
    key: ButtonStyleTypes;
    group_id: number;
}

export type Background = {
    id: number;
    title: string;
    key: string;
    preview: string;
    created_at: string | null;
    updated_at: string | null;
}

export type Link = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    url: string | null;
    type: number;
    thumbnail: string | null;
    thumbnail_url: string | null;
    position: number | null;
    user_id: number;
    deleted_at: string | null;
    is_enabled: boolean;
}
export type Social = {
    id: number;
    social_id: string;
    value: string;
    position: number;
    user_id: number;
    created_at: string | null;
    updated_at: string;
}

export type ProfileData = {
    appearance_settings: AppearanceSettings;
    links: Link[];
    socials: Social[];
}