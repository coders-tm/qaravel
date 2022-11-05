<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Traits\Helpers;

class ClassScheduleController extends Controller
{
    use Helpers;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ClassSchedule $classSchedule)
    {
        $startOfWeek = $prev = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();

        if ($request->filled('date_from') && $request->filled('date_to')) {
            $date_from = Carbon::parse($request->input('date_from'))->format('Y-m-d');
            $date_to = Carbon::parse($request->input('date_to'))->format('Y-m-d');
            $classSchedule = $classSchedule->havingRaw('date_at BETWEEN ? AND ?',  [$date_from, $date_to]);
        } else if ($request->filled('date')) {
            $date = Carbon::parse($request->input('date'));
            $classSchedule = $classSchedule->where([
                'day' => $date->dayName,
                'start_of_week' => $date->startOfWeek()
            ]);
        } else {
            $classSchedule = $classSchedule->where('start_of_week', $startOfWeek);
            if (now()->startOfWeek()->eq($startOfWeek)) {
                $classSchedule->havingRaw('date_at BETWEEN ? AND ?',  [now(), now()->endOfWeek()]);
            }
        }

        if ($request->filled('class')) {
            $classSchedule->where('class_schedules.class_id', $request->class);
        }

        if ($request->filled('filter')) {
            $classSchedule->whereHas('class', function ($q) use ($request) {
                $q->where('name', 'like', "{$request->filter}%");
            });
        }

        if ($request->filled('location')) {
            $classSchedule->where('location_id', $request->location);
        }

        if ($request->filled('instructor')) {
            $classSchedule->where('class_schedules.instructor_id', $request->instructor);
        }

        $classSchedule = $classSchedule->orderBy('day_index')->orderBy('start_at')->get();
        $classSchedule =  $classSchedule->map(function ($item) use ($request) {
            $item->is_booked = $item->isBooked($request->user()->id);
            return $item;
        });

        $hasNext = $startOfWeek->eq(now()->startOfWeek());

        return response()->json([
            'data' => $classSchedule,
            'totalCost' => $classSchedule->sum('cost'),
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'nextOfWeek' => $startOfWeek->addWeek()->format('Y-m-d'),
            'previousOfWeek' => $hasNext ? false : $startOfWeek->subWeeks(2)->format('Y-m-d'),
        ], 200);
    }

    /**
     * Book the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassSchedule  $classSchedule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassSchedule $classSchedule)
    {
        if (!$classSchedule->bookable) {
            abort(403, 'You can only book classes 7 days ahead!');
        }

        if ($classSchedule->has_booked) {
            abort(403, 'Slots are not available for selected class schedule! Please contact reception for standby places.');
        }

        if ($classSchedule->isBooked($request->user()->id)) {
            abort(403, 'Class shedule already booked by you!');
        }

        $classSchedule->bookings()->create([
            'user_id' => $request->user()->id,
            'source' => true,
        ]);

        return response()->json([
            'message' => 'Class shedule has been booked successfully!',
        ], 200);
    }
}
