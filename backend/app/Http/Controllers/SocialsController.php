<?php

namespace App\Http\Controllers;

use App\Models\Socials;
use App\Models\User;
use Illuminate\Http\Request;

class SocialsController extends Controller
{
    public function all()
    {
        $file = file_get_contents(resource_path('/data/socials.json'));
        $data = json_decode($file, true);
        return response()->json($data);
    }

    public function index()
    {

        $user_id = auth()->id();
        $settings = auth()->user()->appearance_settings;
        $socials = auth()->user()->socials;
        return response()->json([
            "socials" => $socials,
            'alignment' => $settings->social_align
        ]);
    }

    public function getOne(String $id)
    {
        $user_id = auth()->id();
        $social = Socials::find([
            "user_id" => $user_id,
            "id" => $id
        ])->first();
        return response()->json($social);
    }

    public function add(Request $request)
    {
        $request->validate([
            'social_id' => 'required|string',
            'value' => 'required|string',
        ]);

        $user_id = auth()->id();

        if (Socials::where(['user_id' => $user_id, 'social_id' => $request->social_id])->first()) {
            return response()->json([
                'message' => 'Social icon already exist'
            ], 400);
        }

        $data = Socials::create([
            'social_id' => $request->social_id,
            'value' => $request->value,
            'user_id' => $user_id
        ]);

        return response()->json($data);
    }

    public function update(string $id, Request $request)
    {
        $request->validate([
            'value' => 'required|string',
        ]);

        $user_id = auth()->id();
        $social = Socials::where(['id' => $id, 'user_id' => $user_id])->first();

        if (!isset($social)) {
            return response()->json([
                'message' => 'Social icon not found'
            ], 400);
        };

        $social->value = $request->value;
        $social->save();

        return response()->json($social);
    }


    public function destroy(string $id)
    {
        $user_id = auth()->id();
        $social = Socials::where(['id' => $id, 'user_id' => $user_id])->first();

        if (!isset($social)) {
            return response()->json([
                'message' => 'Social icon not found'
            ], 400);
        };

        $social->delete();

        return response()->json($social);
    }

    public function updatePosition(Request $request)
    {

        $request->validate([
            'ids' => 'required|string',
        ]);

        $ids = explode(',', $request->ids);
        foreach ($ids as $idx => $id) {
            $update = Socials::find($id);
            $update->position = $idx + 1;
            $update->save();
        }
        $socials = auth()->user()->socials;
        return response()->json($socials);
    }

    public function updateVisibility(String $id,Request $request)
    {
        $user_id = auth()->id();
        $social = Socials::where(['id' => $id, 'user_id' => $user_id])->first();

        $social->enabled = !$social->enabled;
        $social->save();

        return response()->json($social->enabled);
    }

    public function updateSocialAlignment(Request $request)
    {
        $request->validate([
            'position' => 'integer|required',
        ]);

        $settings = auth()->user()->appearance_settings;
        $settings->social_align = $request->position;
        $settings->update();

        return response()->json($settings->social_align);
    }
}
