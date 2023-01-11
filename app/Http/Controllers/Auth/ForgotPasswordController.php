<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Auth\PasswordBroker;

class ForgotPasswordController extends Controller
{
    public function request(Request $request, $guard = null)
    {
        $request->validate(
            [
                'email' => "required|email|exists:{$guard},email",
            ],
            [
                'email.required' => 'Email address is required.',
            ]
        );

        $status = Password::broker($guard)->sendResetLink($request->only('email'));
        if ($status === Password::INVALID_USER) {
            return response()->json([
                'message' => 'User not found!'
            ], 403);
        } elseif ($status === PasswordBroker::RESET_THROTTLED) {
            return response()->json([
                'message' => 'Reset password email already sent. Please try again after sometime!'
            ], 403);
        }

        return response()->json([
            'status' => $status,
            'message' => 'Password reset link sent successfully!'
        ], 200);
    }

    public function reset(Request $request, $guard = null)
    {
        $request->validate(
            [
                'password' => 'required|min:6|same:password_confirmation',
                'password_confirmation' => 'required'
            ],
            [
                'password.required' => 'Password is required.',
                'password_confirmation.required' => 'Password Confirm is required.'
            ]
        );

        $status = Password::broker($guard)->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();

                $user->setRememberToken(Str::random(60));

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Invalid token or token may expired!'
            ], 403);
        }

        return response()->json([
            'status' => $status,
            'message' => 'Password reset successfully!'
        ], 200);
    }
}
