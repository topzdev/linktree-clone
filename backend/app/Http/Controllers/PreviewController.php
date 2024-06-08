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

        $data = [
            "appearance_settings" => $user->appearance_settings,
            "links" => $user->links->where('is_enabled', '=', true)->values(),
            "socials" => $user->socials
        ];
        return response()->json($data);
    }
}
