<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PreviewController extends Controller
{
    public function profile(String $username, Request $request)
    {

        $user = User::where('username', '=', $username)->with(['appearance_settings','socials', 'links'])->first();

        if(!isset($user)) {
            return response()->json([
                "message" => "Profile not found",
                'type' => 'no_profile'
            ], 400);
        }

        $appearance_settings = $user->appearance_settings->toArray();
        $theme = $appearance_settings['theme'];

        unset($appearance_settings['theme']);

        // if settings has theme selected, replace the appearance settings with the theme properties
        if($appearance_settings['theme_id']) {
            $appearance_settings = array_merge($appearance_settings, $theme);
        }

        $data = [
            "appearance_settings" => $appearance_settings,
            "links" => $user->links->where('is_enabled', '=', true)->values(),
            "socials" => $user->socials
        ];
        return response()->json($data);
    }
}
