<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppearanceController extends Controller
{
    //
    public function getOne()
    {
        $user = auth()->user();
        $appearance_settings = $user->appearance_settings;
        return response()->json($appearance_settings);
    }
}
