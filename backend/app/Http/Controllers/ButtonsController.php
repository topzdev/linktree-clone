<?php

namespace App\Http\Controllers;

use App\Models\AppearanceSettings;
use App\Models\Buttons;
use Illuminate\Http\Request;

class ButtonsController extends Controller
{
    //
    public function index()
    {
        $userId = auth()->id();
        $profile = AppearanceSettings::buttonSettings();

        return response()->json($profile);
    }

    public function update(Request $request)
    {

        $request->validate([
            "btn_color" => "string|hex_color",
            "btn_text_color" => "string|hex_color",
            "btn_shadow_color" => "string|hex_color",
            'btn_id' => 'integer'
        ]);

        $settings = AppearanceSettings::buttonSettings();

        $settings->fill($request->only('btn_color', 'btn_text_color', 'btn_shadow_color', 'btn_id'));
        $settings->save();

        return response()->json($settings);
    }

}
