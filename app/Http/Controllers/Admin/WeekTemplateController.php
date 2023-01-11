<?php

namespace App\Http\Controllers\Admin;

use App\Models\WeekTemplate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;
use App\Models\Template;
use App\Traits\Helpers;
use Carbon\Carbon;

class WeekTemplateController extends Controller
{
    use Helpers;

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(WeekTemplate::class);
    }

    /**
     * Display a listing of the week.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, WeekTemplate $weekTemplate)
    {
        if ($request->filled('month') && $request->filled('year')) {
            $month = $request->month + 1;
            $date = "{$request->year}-{$month}";
            $startOfMonth = Carbon::parse($date)->startOfMonth();
            $endOfMonth = Carbon::parse($date)->endOfMonth();
        } else {
            $startOfMonth = now()->startOfMonth();
            $endOfMonth = now()->endOfMonth();
        }

        // get dates
        $dates = $this->weeksBetweenTwoDates($startOfMonth->startOfWeek(), $endOfMonth->endOfWeek()->addWeek());

        $weekTemplates = $weekTemplate->whereIn('start_of_week', $dates)->get()->map(function ($item) {
            return $item->toArray();
        });

        $data = collect($dates)->map(function ($item) use ($weekTemplates) {
            return $weekTemplates->firstWhere('start_of_week', $item) ?? [
                'start_of_week' => $item,
                'start_of_week_formated' => Carbon::parse($item)->format('d/m/Y'),
                'template' => null
            ];
        });

        return response()->json($data, 200);
    }

    /**
     * Updated class schedules of the week.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, WeekTemplate $weekTemplate)
    {
        $rules = [
            'weeks' => 'required|array',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        collect($request->weeks)->each(function ($item) use ($weekTemplate) {
            $weekTemplate->updateOrCreate([
                'start_of_week' => $item['start_of_week'],
            ], [
                'template_id' => isset($item['template']['id']) ? $item['template']['id'] : null
            ]);
            ClassSchedule::has('template')->where('start_of_week', $item['start_of_week'])->forceDelete();
            if (isset($item['template']['id'])) {
                $template = Template::find($item['template']['id']);
                $template->schedules()->each(function ($schedule) use ($item) {
                    ClassSchedule::create([
                        'day' => $schedule->day ? $schedule->day->value : null,
                        'start_at' => $schedule->start_at,
                        'end_at' => $schedule->end_at,
                        'class_id' => $schedule->class_id,
                        'location_id' => $schedule->location_id,
                        'instructor_id' => $schedule->instructor_id,
                        'template_id' => $schedule->template_id,
                        'start_of_week' => $item['start_of_week']
                    ]);
                });
            }
        });

        return response()->json([
            'message' => 'Class schedules has been updated for seleted week successfully!',
        ], 200);
    }
}
