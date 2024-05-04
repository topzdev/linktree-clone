<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    public function oauthLogin(Request $request):JsonResponse
    {
        $request->validate([
            'provider' => ['required', 'string', 'max:255'],
            'access_token' => ['required', 'string'],
        ]);
        $userAgent = $request->userAgent();

        $access_token = $request->access_token;
        $provider = $request->provider;

        $user = [];
        $search = null;

        $isExist = User::where('email', $request->email)->first();

        if(isset($isExist) && !$isExist->google_id) {
            return response()->json([
                "success" => false,
                "message" => "We recognize your account but it looks like you signed up using email. To log in, enter  email, along with your password."
            ], 400);
        }

        $googleUser = Socialite::driver('google')->userFromToken($access_token);

        $user = [
            'firstname' => $googleUser->user["given_name"],
            'lastname' => $googleUser->user["family_name"],
            'email' => $googleUser->user["email"],
            'google_id' => $googleUser->id
        ];

        $search = User::where('email', $user['email'])->first();


        if(!isset($search)) {
            $user['user_agent'] = $userAgent;
            $user = User::create($user);
        } else {
            if($provider === 'google') {
                $search->google_id = $user['google_id'];
            }

            $search->save();

            $user = $search;
        }

        Auth::login($user);

        return response()->json([
            "user" => $user,
            "access_token" => $user->createToken('auth')->plainTextToken,
            "provider" => $provider
        ]);
    }
}
