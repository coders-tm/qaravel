<?php

namespace App\Http\Controllers\Auth;

use App\Models\Core\File;
use Illuminate\Http\Request;
use App\Notifications\UserLogin;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            if (!$request->user($guard)->is_active) {
                Auth::guard($guard)->logout();
                abort(403, 'Your account has been disabled and cannot access this application. Please contact with admin.');
            }
            $request->user($guard)->logs()->create([
                'type' => 'login'
            ]);
            $request->user($guard)->notify(new UserLogin($request));
            return $this->me($guard);
        } else {
            return response()->json([
                'message' => 'Your password doesn\'t match with record.',
                'errors' => [
                    'password' => ['Your password doesn\'t match with our records.']
                ]
            ], 403);
        }
    }

    public function logout(Request $request, $guard = 'users')
    {
        Auth::guard($guard)->logout();
        return response()->json([
            'message' => 'You have been successfully logged out!'
        ], 200);
    }

    public function me($guard = null)
    {

        $user = request()->user($guard)->fresh([
            'address'
        ]);
        if (guard() == 'users') {
            $user = $user->append('default_payment_method')->toArray();
        } else if (guard() == 'admins') {
            $user = $user->append('modules')->toArray();
        }
        $user['guard'] = guard();

        return response()->json($user, 200);
    }

    public function update(Request $request, $guard = 'users')
    {
        $user = $request->user($guard);

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

        if ($request->avatar && !empty($request->avatar)) {
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

        $user = $request->user($guard);
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
        $rules = [
            'email' => 'required|email|unique:users',
            'plan' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
            'line1' => 'required',
            'city' => 'required',
            'postal_code' => 'required',
            'country' => 'required',
            'password' => 'required|min:6|confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $data = $request->only([
            'email',
            'plan',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'line1',
            'city',
            'postal_code',
            'country',
            'password',
        ]);

        $data['password'] = Hash::make($request->password);

        // create the user
        $user = User::create($data);

        // add address to the user
        $user->updateOrCreateAddress($data);

        // login by user id
        Auth::guard($guard)->loginUsingId($user->id);

        $user->logs()->create([
            'type' => 'login'
        ]);

        return $this->me($guard);
    }
}
