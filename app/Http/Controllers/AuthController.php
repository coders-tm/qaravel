<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ],
            [
                'email.required'=> 'Your email address is required.',
                'password.required'=> 'Your password is required.',
            ]
        );
        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = Auth::user();
            $user->roles = $user->roles;
            $user->permissions = $user->permissions;
            return response()->json($user, 200);
        } else {
            return response()->json([
              'message' => 'Your username and password it worng. Please try again with correct login info.'
            ], 403);
        }
    }

    public function logout()
    {
      Auth::guard('web')->logout();
      return response()->json([
        'message' => 'You have been successfully logged out!'
      ], 200);
    }

    public function me()
    {
        $user = Auth::user();
        $user->roles = $user->roles;
        $user->permissions = $user->permissions;
        return response()->json($user, 200);
    }
}
