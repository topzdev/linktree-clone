<?php

namespace App\Http\Controllers;

use App\Models\AppearanceSettings;
use App\Models\Themes;
use Illuminate\Http\Request;

class ThemesController extends Controller
{
    public function index()
    {
        return response()->json(Themes::all());
    }

    public function update(Request $request)
    {
        $request->validate([
            "theme_id" => "required|string|exist:themes"
        ]);
        $data = AppearanceSettings::userAppearanceSettings()->fill($request->only('theme_id'));
        return response()->json($data);
    }

    public function updateCustomTheme(Request $request)
    {
        $uploader = new AssetsManagerController();

        $request->validate([
            "bg_color" => "string",
            "bg_color2" => "string",
            "bg_position" => "string",
            "bg_image" => "required|image|mimes:jpeg,png,jpg,gif|max:2048", // Adjust validation rules as needed
            "bg_video" => "required|file|mimes:mp4,avi,mov|max:20480",
        ]);

        $settings = AppearanceSettings::userAppearanceSettings();

        if($request->file('bg_image')) {
            $uploaded = $uploader->uploadBackgroundImage($request->file('bg_image'));
            $settings->bg_image = $uploaded['source'];
        }

        if($request->file('bg_image')) {
            $uploaded = $uploader->uploadBackgroundVideo($request->file('bg_video'));
            $settings->bg_video = $uploaded['source'];
        }

        $settings->fill($request->only('bg_color', 'bg_color2', 'bg_position'));
        $settings->save();
        $settings->append(['bg_image_url', 'bg_video_url']);

        return response()->json($settings);
    }


}
