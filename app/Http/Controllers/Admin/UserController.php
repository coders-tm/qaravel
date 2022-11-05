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

        if ($request->boolean('isEnquiry')) {
            if ($request->filled('status')) {
                $user->where('status', $request->input('status'));
            }
        } else {
            $user->onlyMember();

            if ($request->boolean('status')) {
                $user->onlyActive();
            }

            if ($request->status == 'no-show') {
                $user->onlyNoShow();
            }

            if ($request->status == 'blocked') {
                $user->onlyBlocked();
            }

            if ($request->filled('type')) {
                switch ($request->input('type')) {
                    case 'checked':
                        $user->onlyChecked();
                        break;

                    case 'notchecked':
                        $user->onlyChecked(0);
                        break;

                    case 'rec_checked':
                        $user->onlyMemChecked();
                        break;

                    case 'rec_notchecked':
                        $user->onlyMemChecked(0);
                        break;

                    case 'rolling':
                        $user->onlyRolling();
                        break;

                    case 'ends':
                    case 'end_date':
                        $user->onlyRolling(false);
                        break;

                    case 'monthly':
                    case 'annual':
                    case 'admin':
                        $user->onlyPlan($request->input('type'));
                        break;

                    case 'free':
                        $user->onlyFree();
                        break;
                }
            }
        }

        if ($request->filled('rag')) {
            $user->where('rag', $request->rag);
        }

        if ($request->boolean('deleted')) {
            $user->onlyTrashed();
        }

        if ($request->filled('month') && $request->filled('year')) {
            $user->whereHas('payment', function ($q) use ($request) {
                $q->whereYear('created_at', $request->year)
                    ->whereMonth('created_at', $request->month);
            });
        }

        $users = $user->sortBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);

        if ($request->boolean('finance')) {
            return response()->json([
                'data' => $users->items(),
                'meta' => [
                    'total' => $users->total(),
                    'per_page' => $users->perPage(),
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'from' => $users->firstItem(),
                    'to' => $users->lastItem(),
                    'totalMember' => User::getStats('count'),
                    'rolling' => User::getStats('rolling'),
                    'endDate' => User::getStats('ends'),
                    'monthly' => User::getStats('monthly'),
                    'annual' => User::getStats('annual'),
                    'free' => User::getStats('free'),
                    'checked' => User::getStats($request->boolean('mem_rec') ? 'rec_checked' : 'checked'),
                    'notChecked' => User::getStats($request->boolean('mem_rec') ? 'rec_notchecked' : 'notchecked'),
                    'adminFee' => User::getStats('admin:fee'),
                    'monthlyFee' => User::getStats('monthly:fee'),
                    'annualFee' => User::getStats('annual:fee'),
                    'endDateFee' => User::getStats('ends:fee'),
                ],
            ], 200);
        }

        return new ResourceCollection($users);
    }

    /**
     * Display a enquiry listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function enquiry(Request $request, User $user)
    {
        $request->merge([
            'isEnquiry' => true,
        ]);
        return $this->index($request, $user);
    }

    /**
     * Display a finance type listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function finance_types(Request $request, User $user)
    {
        $request->merge([
            'finance' => true,
        ]);
        return $this->index($request, $user);
    }

    /**
     * Display a finance membership listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function finance_memberships(Request $request, User $user)
    {
        $request->merge([
            'finance' => true,
            'mem_rec' => true,
        ]);
        return $this->index($request, $user);
    }

    /**
     * Display a finance membership listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function finance_admins(Request $request, User $user)
    {
        $request->merge([
            'finance' => true,
        ]);
        return $this->index($request, $user);
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
            'data' => $user->fresh(['address', 'notes', 'plan']),
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
        return response()->json($user->load(['notes', 'plan']), 200);
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
            'data' => $user->fresh(['address', 'notes', 'plan']),
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
     * Change foc of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function checked_foc(Request $request, User $user)
    {
        $user->update([
            'foc' => !$user->foc
        ]);

        $request->merge([
            'amount' => $user->plan ? $user->plan->plan_fee : 0
        ]);

        // updated payment
        $user->payment()->update($request->only([
            'amount',
        ]));

        return response()->json([
            'message' => $user->foc ? 'Member foc marked as checked successfully!' : 'Member foc marked as unchecked successfully!',
        ], 200);
    }

    /**
     * Change mem_rec of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function checked_mem_rec(Request $request, User $user)
    {
        $user->update([
            'mem_rec' => !$user->mem_rec
        ]);

        $request->merge([
            'amount' => $user->plan ? $user->plan->plan_fee : 0
        ]);

        // updated payment
        $user->payment()->update($request->only([
            'amount',
        ]));

        return response()->json([
            'message' => $user->mem_rec ? 'Member rec marked as checked successfully!' : 'Member rec marked as unchecked successfully!',
        ], 200);
    }

    /**
     * Change membership of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function finance_membership(Request $request, User $user)
    {
        // update user info
        $user->update($request->only(['collect_id']));

        $request->merge([
            'amount' => $user->plan ? $user->plan->plan_fee : 0
        ]);

        // updated payment
        $user->payment()->update($request->only([
            'amount',
            'admin_date',
            'starts_at',
            'ends_at'
        ]));

        return response()->json([
            'message' => 'Member has been update successfully!',
        ], 200);
    }

    /**
     * Display a schedules listing of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function schedules(Request $request, User $user)
    {
        ClassSchedule::resolveRelationUsing('booking', function ($schedule) use ($user) {
            return $schedule->hasOne(Booking::class, 'schedule_id')->withOnly([])->where('user_id', $user->id);
        });

        $classes = $user->schedules()->with('booking');

        if ($request->filled('filter')) {
            $classes->whereHas('class', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->filter}%");
            });
            $classes->orWhere('day', 'like', "%{$request->filter}%");
        }

        if ($request->filled('date_from') && $request->filled('date_to')) {
            $date_from = Carbon::parse($request->input('date_from'))->format('Y-m-d');
            $date_to = Carbon::parse($request->input('date_to'))->format('Y-m-d');
            $classes->havingRaw('date_at BETWEEN ? AND ?',  [$date_from, $date_to]);
        } else if ($request->filled('date')) {
            $date = Carbon::parse($request->input('date'));
            $classes->havingRaw('date_at = ?', [$date]);
        }

        if ($request->filled('status')) {
            switch ($request->status) {
                case 'active':
                    $classes->havingRaw('date_at >= CURDATE()')
                        ->whereHas('bookings', function ($q) use ($user) {
                            $q->where('user_id', $user->id)
                                ->whereNull('canceled_at');
                        });
                    break;

                case 'cancelled':
                    $classes->whereHas('bookings', function ($q) use ($user) {
                        $q->where('user_id', $user->id)
                            ->whereNotNull('canceled_at');
                    });
                    break;

                case 'noshow':
                    $classes->whereHas('bookings', function ($q) use ($user) {
                        $q->where('user_id', $user->id)
                            ->whereNull('canceled_at')
                            ->whereHas('schedule', function ($q) {
                                $q->whereNotNull('sign_off_at');
                            })
                            ->where('attendence', 0);
                    });
                    break;
            }
        }

        $classes = $classes->orderBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);
        return new ResourceCollection($classes);
    }

    /**
     * Create notes for specified resource from storage.
     *
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function notes(Request $request, User $user)
    {

        if ($request->filled('rag')) {
            $user->update($request->only('rag'));
        }

        if ($request->filled('message')) {
            $request->merge([
                'type' => 'notes',
            ]);

            $note = $user->notes()->create($request->input());

            return response()->json([
                'data' => $note->load('admin'),
                'message' => 'Note has been added successfully!',
            ], 200);
        } else {
            return response()->json([
                'data' => null,
                'message' => 'Note has been added successfully!',
            ], 200);
        }
    }

    public function reports(Request $request)
    {
        return response()->json([
            'total' => User::getStatsByMonthAndYear('total', $request->month, $request->year),
            'rolling' => User::getStatsByMonthAndYear('rolling', $request->month, $request->year),
            'end_date' => User::getStatsByMonthAndYear('end_date', $request->month, $request->year),
            'monthly' => User::getStatsByMonthAndYear('monthly', $request->month, $request->year),
            'annual' => User::getStatsByMonthAndYear('annual', $request->month, $request->year),
            'free' => User::getStatsByMonthAndYear('free', $request->month, $request->year),
            'cancelled' => User::getStatsByMonthAndYear('cancelled', $request->month, $request->year),
        ], 200);
    }
}
