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
        return response()->json(Buttons::all());
    }

    public function update(Request $request)
    {

        $request->validate([
            "btn_color" => "string|hex_color",
            "btn_text_color" => "string|hex_color",
            "btn_shadow_color" => "string|hex_color",
            'btn_id' => 'string'
        ]);

        $settings = AppearanceSettings::userAppearanceSettings();

        $settings->fill($request->only('btn_color', 'btn_text_color', 'btn_shadow_color', 'btn_id'));
        $settings->save();

        return response()->json($settings);
    }

}
