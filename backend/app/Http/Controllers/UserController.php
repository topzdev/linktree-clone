<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\UsernameFormat;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user = User::with('appearance_settings', 'socials')->find(auth()->id());
        return $user;
    }

    public function updateUser(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'username' => [new UsernameFormat],
        ]);

        $user->username = $request->username;

        $user->save();

        return response()->json(['message' => 'User Updated Successfully']);
    }

    public function updateAccountInfo(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;
        $request->validate([
            "username" => [new UsernameFormat($withIsExist = true, $ignoreUserId = $userId)],
            "firstname" => 'string|required',
            "lastname" => 'string|required',
            "email" => "string|required|email"
        ]);

        if (!($user->email === $request->email)) {
            $isExist = User::where(['email' => $request->email])->exists();

            if ($isExist) {
                throw ValidationException::withMessages([
                    'email' => ['email address is already taken']
                ]);
            }
        }

        $user = User::find($user->id);

        $user->fill($request->only(['username', 'firstname', 'lastname', 'email']));
        $user->save();

        return response()->json(['message' => 'User Account Info Updated']);
    }

    public function changePassword(Request $request)
    {

        $request->validate([
            'password' => ['required', Rules\Password::defaults()],
            'new_password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $user = User::find(auth()->id());

        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['Current password does not match'],
            ]);
        }

        if($request->password === $request->new_password) {
            throw ValidationException::withMessages([
                'new_password' => ['New password cannot be the same as the current password'],
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($request->new_password)
        ])->save();

        return response()->json(["message" => "Password updated successfully"]);
    }

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'code' => 'string|required'
        ]);

        $user = auth()->user();
        $user = User::find($user->id);
        
        if($request->code != $user->username) {
            return response()->json(["message" => "Code does not matched"]);
        }

        $user->delete();
        return response()->json(["message" => "Account Deleted"]);
    }
}
