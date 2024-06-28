<?php

namespace App\Http\Controllers;

use App\Models\AppearanceSettings;
use App\Models\Fonts;
use Illuminate\Http\Request;

class FontsController extends Controller
{
    public function index()
    {
        return response()->json(Fonts::all());
    }

    public function getOne() {
        $font = AppearanceSettings::fontSettings();
        return response()->json($font);
    }

    public function update(Request $request)
    {
        $request->validate([
            "font_id" => "integer",
            "font_color" => "hex_color",
        ]);

        $settings = AppearanceSettings::userAppearanceSettings();

        $settings->fill($request->only('font_id', 'font_color'));
        $settings->save();

        return response()->json($settings);
    }
}
