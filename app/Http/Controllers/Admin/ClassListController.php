<?php

namespace App\Http\Controllers\Admin;

use App\Models\ClassList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ClassListController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(ClassList::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ClassList $classList)
    {
        $classList = $classList->query();

        if ($request->filled('filter')) {
            $classList->where('name', 'like', "%{$request->filter}%");
        }

        if ($request->boolean('active')) {
            $classList->onlyActive();
        }

        if ($request->boolean('deleted')) {
            $classList->onlyTrashed();
        }

        $classList = $classList->orderBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);
        return new ResourceCollection($classList);
    }

    /**
     * Display a options listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function options(Request $request, ClassList $classList)
    {
        $request->merge([
            'option' => true
        ]);
        return $this->index($request, $classList);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, ClassList $classList)
    {
        $rules = [
            'name' => 'required',
            'capacity' => 'required',
            'description' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        // create the classList
        $classList = ClassList::create($request->input());

        return response()->json([
            'data' => $classList,
            'message' => 'Class has been created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassList  $classList
     * @return \Illuminate\Http\Response
     */
    public function show(ClassList $classList)
    {
        return response()->json($classList, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClassList  $classList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClassList $classList)
    {

        $rules = [
            'name' => 'required',
            'capacity' => 'required',
            'description' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        // update the classList
        $classList->update($request->input());

        return response()->json([
            'data' => $classList->fresh(),
            'message' => 'Class has been update successfully!',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassList  $classList
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassList $classList)
    {
        $classList->delete();
        return response()->json([
            'message' => 'Class has been deleted successfully!',
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     *
     * @param  \App\Models\ClassList  $classList
     * @return \Illuminate\Http\Response
     */
    public function change_active(Request $request, ClassList $classList)
    {
        $classList->update([
            'is_active' => !$classList->is_active
        ]);

        return response()->json([
            'message' => $classList->is_active ? 'Class marked as active successfully!' : 'Class marked as deactivated successfully!',
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     *
     * @param  \App\Models\ClassList  $classList
     * @return \Illuminate\Http\Response
     */
    public function change_has_description(Request $request, ClassList $classList)
    {
        $classList->update([
            'has_description' => !$classList->has_description
        ]);

        return response()->json([
            'message' => $classList->has_description ? 'Class description marked as visiable successfully!' : 'Class description marked as hide successfully!',
        ], 200);
    }
}
