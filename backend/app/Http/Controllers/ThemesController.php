<?php

namespace App\Http\Controllers;

use App\Models\AppearanceSettings;
use App\Models\Themes;
use Illuminate\Http\Request;

class ThemesController extends Controller
{
    public function index()
    {
        return response()->json(Themes::all(['id','title','key', 'preview']));
    }

    public function getOne()
    {
        $data = AppearanceSettings::themeSettings()->toArray();
        $themes = Themes::all(['id','title','key', 'preview']);
        $themes->append(['preview_url']);
        return response()->json(array_merge($data, [
            "themes" => $themes
        ]));
    }

    public function update(Request $request)
    {
        $request->validate([
            "theme_id" => "required|integer|exists:themes,id"
        ]);
        $settings = AppearanceSettings::themeSettings();
        $settings->fill($request->only('theme_id'));
        $settings->bg_id = null;
        $settings->save();
        return response()->json($settings);
    }

    public function updateCustomTheme(Request $request)
    {
        $uploader = new AssetsManagerController();

        $request->validate([
            'bg_id' => "integer",
            "bg_color" => "string|hex_color",
            "bg_from" => "string|hex_color",
            "bg_to" => "string|hex_color",
            "bg_position" => "string",
            "bg_image" => "image|mimes:jpeg,png,jpg,gif,webp|max:2048", // Adjust validation rules as needed
            "bg_image_m" => "image|mimes:jpeg,png,jpg,gif,webp|max:2048", // Adjust validation rules as needed
            "bg_video" => "file|mimes:mp4,avi,mov|max:20480",
            "bg_video_m" => "file|mimes:mp4,avi,mov|max:20480",
        ]);

        $settings = AppearanceSettings::themeSettings();


        $settings->fill($request->only('bg_id', 'bg_color', 'bg_from', 'bg_to', 'bg_position'));

        // when custom theme updated, set theme_id as null so that it will preview what bg selected in custom theme
        $settings->theme_id = null;

        if ($request->file('bg_image')) {
            if ($settings->bg_image) {
                $uploader->delete($settings->bg_image);
            }

            $uploaded = $uploader->uploadBackgroundImage($request->file('bg_image'));
            $settings->bg_image = $uploaded['source'];
        }

        if ($request->file('bg_image_m')) {
            if ($settings->bg_image_m) {
                $uploader->delete($settings->bg_image_m);
            }

            $uploaded = $uploader->uploadBackgroundImage($request->file('bg_image_m'));
            $settings->bg_image_m = $uploaded['source'];
        }

        if ($request->file('bg_video')) {
            if ($settings->bg_video) {
                $uploader->delete($settings->bg_video);
            }

            $uploaded = $uploader->uploadBackgroundVideo($request->file('bg_video'));
            $settings->bg_video = $uploaded['source'];
        }

        if ($request->file('bg_video_m')) {
            if ($settings->bg_video_m) {
                $uploader->delete($settings->bg_video_m);
            }

            $uploaded = $uploader->uploadBackgroundVideo($request->file('bg_video_m'));
            $settings->bg_video_m = $uploaded['source'];
        }


        $settings->save();

        return response()->json($settings);
    }

}
