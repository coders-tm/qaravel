<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user)
    {
        $user = $user->query();

        if ($request->filled('filter')) {
            $user->where('first_name', 'like', "%{$request->filter}%");
        }

        if ($request->boolean('deleted') ?: false) {
            $user->onlyTrashed();
        }

        $user = $user->sortBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);
        return new ResourceCollection($user);
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
            'address' => 'required',
            'password' => 'required|min:6|confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $data = $request->only([
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password',
        ]);

        $data['password'] = Hash::make($request->password);

        // create the user
        $user = User::create($data);

        // add address to the user
        $user->updateOrCreateAddress($request->input('address'));

        $user = $user->fresh('address');

        $user['subscription'] = [
            'message' => $user->is_free_forever ? 'Currently user using free forever plan.' : 'Currently user didn\'t subscribed to any plan.',
            'upcomingInvoice' => [],
        ];

        return response()->json([
            'data' => $user,
            'message' => 'User has been created successfully!',
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
        $user['subscription'] = null;

        if ($user->subscribed()) {
            $subscription = $user->subscription('default');
            $upcomingInvoice = $user->subscription('default')->upcomingInvoice();

            if ($subscription->canceled()) {
                $subscription['message'] = "User have cancelled your subscription. User's subscription will end on {$subscription->ends_at->format('D d M Y')}";
            } else {
                $subscription['upcomingInvoice'] =  [
                    'amount' => $upcomingInvoice->total(),
                    'date' => $upcomingInvoice->date()->toFormattedDateString(),
                ];
            }
            $user['subscription'] = $subscription;
        } else {
            $user['subscription'] = [
                'message' => $user->is_free_forever ? 'Currently user using free forever plan.' : 'Currently user didn\'t subscribed to any plan.',
                'upcomingInvoice' => [],
            ];
        }
        return response()->json($user, 200);
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
            'address' => 'required',
            'email' => "email|unique:users,email,{$user->id}",
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

        return response()->json([
            'data' => $user->fresh('address'),
            'message' => 'User has been update successfully!',
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
        $user->delete();
        return response()->json([
            'message' => 'User has been deleted successfully!',
        ], 200);
    }

    /**
     * Marked as admin the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function marked_as_admin(User $user)
    {
        $user->update([
            'is_free_forever' => !$user->is_free_forever
        ]);

        return response()->json([
            'message' => $user->is_free_forever ? 'User marked as free successfully!' : 'User marked as paid successfully!',
        ], 200);
    }
}
