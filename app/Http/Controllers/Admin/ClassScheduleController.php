<?php

namespace App\Http\Controllers\Admin;

use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class ClassScheduleController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(ClassSchedule::class);
    }

    /**
     * Display a listing of the week.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ClassSchedule $classSchedule)
    {
        $startOfWeek = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();

        $classSchedule = $classSchedule->where('start_of_week', $startOfWeek);

        if ($request->boolean('hasClass')) {
            $classSchedule->has('class');
        }

        if ($request->boolean('deleted')) {
            $classSchedule->onlyTrashed();
        }

        return response()->json([
            'data' => $classSchedule->orderBy('day_index')->orderBy('start_at')->get(),
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'nextOfWeek' => $startOfWeek->addDays(7)->startOfWeek()->format('Y-m-d'),
            'previousOfWeek' => $startOfWeek->subDays(8)->startOfWeek()->format('Y-m-d'),
        ], 200);
    }

    /**
     * Display a listing of the week.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request, ClassSchedule $classSchedule)
    {
        $startOfWeek = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();

        $classSchedule = $classSchedule->where('start_of_week', $startOfWeek);

        if ($request->boolean('hasClass')) {
            $classSchedule->has('class');
        }

        if ($request->boolean('deleted')) {
            $classSchedule->onlyTrashed();
        }
        $classSchedule = $classSchedule->orderBy('day_index')->orderBy('start_at')->get();

        return response()->json($classSchedule->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->location ? "{$item->class->name} - {$item->location->label}" : $item->class->name,
                'location' => optional($item->location)->label,
                'instructor' => optional($item->instructor)->name,
                'class_name' => $item->class->name,
                'class_description' => $item->has_description ? $item->class->description : null,
                'start' => Carbon::parse("{$item->date_at->format('Y-m-d')} {$item->start_at}"),
                'end' => Carbon::parse("{$item->date_at->format('Y-m-d')} {$item->end_at}"),
                'color' => $item->has_sign_off ? '#dc3545' : null,
            ];
        }), 200);
    }

    /**
     * Updated class schedules of the week.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'start_of_week' => 'required',
            'class_schedules' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $classSchedules = collect($request->class_schedules);

        // remove the deleted class schedules
        ClassSchedule::where('start_of_week', Carbon::parse($request->start_of_week))
            ->whereNotIn('id', $classSchedules->pluck('id')->filter())
            ->delete();

        // Update or create the class schedules
        $classSchedules->map(function ($item) {
            return (object) $item;
        })->each(function ($schedule) {
            ClassSchedule::updateOrCreate([
                'id' => optional($schedule)->id,
            ], [
                'day' => optional($schedule)->day,
                'start_of_week' => optional($schedule)->start_of_week,
                'start_at' => optional($schedule)->start_at,
                'end_at' => optional($schedule)->end_at,
                'class_id' => optional($schedule)->class ? optional($schedule)->class['id'] : null,
                'location_id' => optional($schedule)->location ? optional($schedule)->location['id'] : null,
                'instructor_id' => optional($schedule)->instructor ? optional($schedule)->instructor['id'] : null,
            ]);
        });

        return response()->json([
            'message' => 'Class schedules has been updated for seleted week successfully!',
        ], 200);
    }
}
