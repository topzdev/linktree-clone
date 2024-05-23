interface AppearanceSettings {
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
    btn_text_color: string;
    profile_bio: string;
    profile_image_style: number;
    profile_title: string;
    profile_avatar: string;
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

interface Font {
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

interface Button {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    title: string;
    key: string;
    group_id: number;
}

interface Background {
    id: number;
    title: string;
    key: string;
    preview: string;
    created_at: string | null;
    updated_at: string | null;
}

interface Link {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    url: string | null;
    type: number;
    thumbnail: string | null;
    position: number | null;
    user_id: number;
    deleted_at: string | null;
}

interface Social {
    id: number;
    social_id: string;
    value: string;
    position: number;
    user_id: number;
    created_at: string | null;
    updated_at: string;
}

interface Data {
    appearance_settings: AppearanceSettings;
    links: Link[];
    socials: Social[];
}