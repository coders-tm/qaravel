<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use App\Http\Controllers\Controller;
use App\Traits\Helpers;
use Barryvdh\DomPDF\Facade\Pdf;

class RegistrationController extends Controller
{
    use Helpers;

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(ClassSchedule::class, 'registration');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ClassSchedule $registration)
    {
        $startOfWeek = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();
        $sortBy = $request->otherSortBy != 'start_at' ? $request->otherSortBy : $request->sortBy;
        $otherSortBy = $request->otherSortBy != 'start_at' ? $request->sortBy : $request->otherSortBy;

        if ($request->filled('date_from') && $request->filled('date_to')) {
            $date_from = Carbon::parse($request->input('date_from'))->format('Y-m-d');
            $date_to = Carbon::parse($request->input('date_to'))->format('Y-m-d');
            $registration = $registration->havingRaw('date_at BETWEEN ? AND ?',  [$date_from, $date_to]);
        } else if ($request->filled('date')) {
            $date = Carbon::parse($request->input('date'));
            $registration = $registration->where([
                'day' => $date->dayName,
                'start_of_week' => $date->startOfWeek()
            ]);
        } else {
            $registration = $registration->where('start_of_week', $startOfWeek);
        }

        if ($request->filled('class')) {
            $registration->where('class_schedules.class_id', $request->class);
        }

        if ($request->filled('location')) {
            $registration->where('location_id', $request->location);
        }

        if ($request->filled('instructor')) {
            $registration->where('class_schedules.instructor_id', $request->instructor);
        }

        if ($request->boolean('deleted')) {
            $registration->onlyTrashed();
        }

        $registrations =  $registration->orderBy($sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->orderBy($otherSortBy ?? 'start_at', 'asc')
            ->paginate(optional($request)->rowsPerPage ?? 15);

        return response()->json([
            'data' => $registrations->items(),
            'meta' => [
                'total' => $registrations->total(),
                'per_page' => $registrations->perPage(),
                'current_page' => $registrations->currentPage(),
                'last_page' => $registrations->lastPage(),
            ],
            'totalCost' => $registration->sum('cost'),
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'nextOfWeek' => $startOfWeek->addDays(7)->startOfWeek()->format('Y-m-d'),
            'previousOfWeek' => $startOfWeek->subDays(8)->startOfWeek()->format('Y-m-d'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassSchedule  $registration
     * @return \Illuminate\Http\Response
     */
    public function show(ClassSchedule $registration)
    {
        return response()->json($registration->load(['active_bookings', 'stand_by_bookings']), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassSchedule  $registration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassSchedule $registration)
    {
        if ($request->boolean('has_sign_off')) {
            $request->merge([
                'sign_off_at' => now(),
                'admin_id' => auth('admins')->user()->id
            ]);
        } else {
            $request->merge([
                'sign_off_at' => null,
                'admin_id' => null
            ]);
        }
        // update the registration
        $registration->update($request->input());

        if ($request->filled('active_bookings')) {
            $registration->syncActiveBookings(collect($request->active_bookings));
        }

        if ($request->filled('stand_by_bookings')) {
            $registration->syncStandbyBookings(collect($request->stand_by_bookings));
        }

        return response()->json([
            'data' => $registration->fresh(['active_bookings', 'stand_by_bookings']),
            'message' => 'Class schedule has been update successfully!',
        ], 200);
    }

    /**
     * Print the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassSchedule  $registration
     * @return \Illuminate\Http\Response
     */
    public function pdf(Request $request, ClassSchedule $registration)
    {
        return Pdf::loadView('pdfs.registration', [
            'registration' => $registration
        ])->download("registration-{$registration->label}.pdf");
    }
}
