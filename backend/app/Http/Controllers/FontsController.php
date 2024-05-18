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

    public function update(Request $request)
    {
        $request->validate([
            "font_id" => "required|string",
        ]);

        $settings = AppearanceSettings::userAppearanceSettings();

        $settings->font_id = $request->font_id;
        $settings->save();

        return response()->json($settings);
    }
}
