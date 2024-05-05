<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\Username;
use App\Rules\UsernameFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
        $user =  User::with('appearance_settings')->find(auth()->id());
        return $user;
    }

    public function updateUser(Request $request) {
        $user = $request->user();
        $request->validate([
            'username' => [new UsernameFormat],
        ]);

        $user->username = $request->username;

        $user->save();

        return response()->json(['message' => 'User Updated Successfully']);
    }
}
