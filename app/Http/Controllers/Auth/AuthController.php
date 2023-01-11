<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Core\File;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Notifications\UserLogin;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request, $guard = 'users')
    {
        $request->validate(
            [
                'email' => "required|email|exists:{$guard},email",
                'password' => 'required',
            ],
            [
                'email.required' => 'Your email address is required.',
                'email.exists' => 'Your email address doens\'t exists.',
                'password.required' => 'Your password is required.',
            ]
        );

        if (Auth::guard($guard)->attempt($request->only(['email', 'password']))) {
            $user = $request->user($guard);

            // check user status
            if (!$user->is_active) {
                Auth::guard($guard)->logout();
                abort(403, 'Your account has been disabled and cannot access this application. Please contact with admin.');
            }

            // create log
            $user->logs()->create([
                'type' => 'login'
            ]);

            try {
                // send login alert to user if smtp configured
                $user->notify(new UserLogin($request));
            } catch (\Throwable $th) {
                report($th);
            }

            // create and return user with token
            $token = $user->createToken($request->device_id, [$guard]);
            return response()->json([
                'user' => $user,
                'token' => $token->plainTextToken,
            ], 200);
        } else {
            throw ValidationException::withMessages([
                'password' => ['Your password doesn\'t match with our records.'],
            ]);
        }
    }

    public function logout(Request $request, $guard = 'users')
    {
        try {
            Auth::guard($guard)->logout();
            $request->user()->currentAccessToken()->delete();
        } catch (\Throwable $th) {
            report($th);
        }

        return response()->json([
            'message' => 'You have been successfully logged out!'
        ], 200);
    }

    public function me($guard = null)
    {
        $user = current_user()->fresh([
            'address',
            'last_login'
        ]);

        if (guard() == 'users') {
            $user = $user->toArray();
        } else if (guard() == 'admins') {
            $user = $user->append('modules')->toArray();
        }

        return response()->json($user, 200);
    }

    public function update(Request $request, $guard = 'users')
    {
        $user = current_user();

        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'address' => 'required',
            'email' => "email|unique:{$guard},email,{$user->id}",
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $user->update($request->only([
            'first_name',
            'last_name',
            'email',
            'phone_number',
        ]));

        // add address to the user
        $user->updateOrCreateAddress($request->input('address'));

        if ($request->filled('avatar')) {
            $image = File::find($request->avatar['id']);
            $user->avatar()->save($image);
        }

        return $this->me($guard);
    }

    public function password(Request $request, $guard = 'users')
    {
        $rules = [
            'old_password' => 'required',
            'password' => 'min:6|confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $user = current_user();
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

    public function signup(Request $request, $guard = 'users')
    {
        $request->merge([
            'profit_id' => substr($request->profit_id, 2),
            'id' => substr($request->profit_id, 2),
        ]);

        $rules = [
            'email' => "required|email|exists:{$guard},email",
            'profit_id' => "required|exists:{$guard},id",
            'first_name' => [
                'required',
                Rule::exists('users')->where(function ($query) use ($request) {
                    return $query->where($request->only('id', 'first_name'));
                }),
            ],
            'last_name' => [
                'required',
                Rule::exists('users')->where(function ($query) use ($request) {
                    return $query->where($request->only('id', 'last_name'));
                }),
            ],
            'password' => 'required|min:6|confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $request->merge([
            'password' => Hash::make($request->password),
        ]);

        $user = User::where($request->only([
            'email',
            'id',
            'first_name',
            'last_name',
        ]))->first();

        if ($user->logs()->where('type', 'register')->count() > 0) {
            abort(403, "Account already registered using this ID. Please use \"Account Recovery\" if you need to recover a lost account.");
        }

        // set password to user
        $user->update($request->only(['password']));

        // add address to the user
        $user->updateOrCreateAddress([]);

        // login by user id
        Auth::guard($guard)->loginUsingId($user->id);

        $user->logs()->create([
            'type' => 'register',
            'message' => 'User has been registered from member portal.'
        ]);

        return $this->me($guard);
    }
}
