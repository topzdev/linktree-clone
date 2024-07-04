import {AppearanceSettings} from "../../types/models";
import Color from "color";

type ProfileCssVariablesConfig = Pick<AppearanceSettings, 'btn_color' | 'btn_text_color' | 'btn_shadow_color' | 'bg_color'>

const profileCssVariables = ({btn_text_color, btn_shadow_color, btn_color, bg_color}: ProfileCssVariablesConfig) => {
    const softShadowColor = Color(btn_shadow_color as string).alpha(.25).toString();

    return {
        ['--btn-color' as any]: btn_color,
        ['--bg-color' as any]: bg_color || '#000',
        ['--btn-text-color' as any]: btn_text_color,
        ['--btn-shadow-color' as any]: btn_shadow_color,
        ['--btn-soft-shadow-color' as any]: softShadowColor,
    }
}

export default profileCssVariables