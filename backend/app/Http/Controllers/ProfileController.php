<?php

namespace App\Http\Controllers;

use App\Models\AppearanceSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        $profile =  AppearanceSettings::profile();

        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $request->validate([
            'profile_bio' => 'string|max:255',
            'profile_image_style' => 'string|in:1,2',
            'profile_title' => 'string|max:32',
        ]);

        $profile = AppearanceSettings::profile();

        $profile->fill($request->only(['profile_bio', 'profile_image_style', 'profile_title']))->save();

        return response()->json($profile);
    }

    public function updateAvatar(Request $request)
    {

        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust validation rules as needed
        ]);

        $profile = AppearanceSettings::profile();

        if (empty($profile)) {
            return response()->json([
                'message' => 'Profile not exist'
            ], 404);
        }

        if ($profile->profile_avatar) {
            ImageManagerController::delete($profile->profile_avatar);
        }

        $uploaded =  ImageManagerController::uploadAvatar($request->file('image'));

        if ($uploaded['source']) {
            $profile->profile_avatar = $uploaded['source'];
            $profile->save();
            return response()->json($uploaded, 200);
        }

        return response()->json(['message' => 'Failed to update avatar'], 500);
    }

    public function removeAvatar()
    {

        $profile = AppearanceSettings::profile();

        if($profile->profile_avatar) {
            ImageManagerController::delete($profile->profile_avatar);
            $profile->profile_avatar = null;
            $profile->save();
        }

        return response()->json($profile);
    }
}
