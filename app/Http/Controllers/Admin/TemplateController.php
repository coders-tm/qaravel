<?php

namespace App\Http\Controllers\Admin;

use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TemplateController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Template::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Template $template)
    {
        $template = $template->query();

        if ($request->filled('filter')) {
            $template->where('label', 'like', "%{$request->filter}%");
        }

        if ($request->boolean('active')) {
            $template->onlyActive();
        }

        if ($request->boolean('deleted')) {
            $template->onlyTrashed();
        }

        $template = $template->orderBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);
        return new ResourceCollection($template);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Template $template)
    {
        $rules = [
            'label' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        // create the template
        $template = Template::create($request->input());

        if ($request->filled('schedules')) {
            $template->syncSchedules(collect($request->schedules));
        }

        return response()->json([
            'data' => $template->fresh('schedules'),
            'message' => 'Template has been created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        return response()->json($template->load('schedules'), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template)
    {

        $rules = [
            'label' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        // update the template
        $template->update($request->input());

        if ($request->filled('schedules')) {
            $template->syncSchedules(collect($request->schedules));
        }

        return response()->json([
            'data' => $template->fresh('schedules'),
            'message' => 'Template has been update successfully!',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy(Template $template)
    {
        $template->delete();
        return response()->json([
            'message' => 'Template has been deleted successfully!',
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function change_active(Request $request, Template $template)
    {
        $template->update([
            'is_active' => !$template->is_active
        ]);

        return response()->json([
            'message' => $template->is_active ? 'Template marked as active successfully!' : 'Template marked as deactivated successfully!',
        ], 200);
    }
}
