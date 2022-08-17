<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(
            [
                'email' => "required|email|exists:users,email",
                'password' => 'required',
            ],
            [
                'email.required' => 'Your email address is required.',
                'email.exists' => 'Your email address doesn\'t exists.',
                'password.required' => 'Your password is required.',
            ]
        );

        if (Auth::attempt($request->only(['email', 'password']))) {
            return $this->me();
        } else {
            return response()->json([
              'message' => 'Your password doesn\'t match with record.',
              'errors' => [
                'password' => ['Your password doesn\'t match with our records.']
              ]
            ], 403);
        }
    }

    public function logout(Request $request)
    {
      Auth::guard('users')->logout();
      return response()->json([
        'message' => 'You have been successfully logged out!'
      ], 200);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => "email|unique:users,email,{$user->id}",
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $user->update($request->input());

        return response()->json($request->user()->load('roles', 'permissions'), 200);
    }

    public function password(Request $request)
    {
        $rules = [
            'old_password' => 'required',
            'password' => 'min:6|confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $user = $request->user();
        if (Hash::check($request->old_password,  $user->password)) {
          $user->update([
            'password' => bcrypt($request->password)
          ]);
        } else {
          return response()->json([
            'message' => 'Old password doesn\'t match!'
          ], 404);
        }

        return response()->json([
          'message' => 'Password has been changed successfully!'
        ], 200);
    }

    public function me()
    {
        return response()->json(request()->user()->load('roles', 'permissions'), 200);
    }
}
