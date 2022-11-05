<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user)
    {
        $user = $user->with($request->includes ?? []);

        if ($request->filled('filter')) {
            $user->where(DB::raw("CONCAT(first_name,' ',last_name)"), 'like', "%{$request->filter}%");
            $user->orWhere('email', 'like', "%{$request->filter}%");
        }

        if ($request->boolean('status')) {
            $user->onlyActive();
        }

        if ($request->boolean('deleted')) {
            $user->onlyTrashed();
        }

        $users = $user->sortBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);

        return new ResourceCollection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $rules = [
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            // 'address' => 'required',
            'password' => 'confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $request->merge([
            'password' => bcrypt($request->password ?? str()->random(6)),
            'plan_id' => $request->input('plan.id'),
        ]);

        // create the user
        $user = User::create($request->only($user->getFillable()));

        // add address to the user
        // $user = $user->updateOrCreateAddress($request->input('address'));
        $user = $user->updateOrCreateAddress([]);

        return response()->json([
            'data' => $user->fresh(['address', 'logs']),
            'message' => 'Member has been created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user->load(['logs']), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            // 'address' => 'required',
            'email' => "email|unique:users,email,{$user->id}",
            'password' => 'confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        if ($request->filled('password')) {
            $request->merge([
                'password' => bcrypt($request->password),
            ]);
        }

        $request->merge([
            'plan_id' => $request->input('plan.id'),
        ]);

        $user->update($request->only($user->getFillable()));

        // add address to the user
        // $user = $user->updateOrCreateAddress($request->input('address'));

        return response()->json([
            'data' => $user->fresh(['address', 'logs']),
            'message' => 'Member has been update successfully!',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->forceDelete();
        return response()->json([
            'message' => 'Member has been deleted successfully!',
        ], 200);
    }

    /**
     * Send reset password request to specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function reset_password_request(Request $request, User $user)
    {
        $status = Password::sendResetLink([
            'email' => $user->email,
        ]);

        return response()->json([
            'status' => $status,
            'message' => 'Password reset link sent successfully!',
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function change_active(Request $request, User $user)
    {
        $user->update([
            'is_active' => !$user->is_active
        ]);

        return response()->json([
            'message' => $user->is_active ? 'Member marked as active successfully!' : 'Member marked as deactivated successfully!',
        ], 200);
    }

    /**
     * Create notes for specified resource from storage.
     *
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function notes(Request $request, User $user)
    {
        $rules = [
            'message' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $request->merge([
            'type' => 'notes',
        ]);

        $note = $user->notes()->create($request->input());

        return response()->json([
            'data' => $note->load('admin'),
            'message' => 'Note has been added successfully!',
        ], 200);
    }
}
