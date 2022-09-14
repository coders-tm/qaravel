<?php

namespace App\Http\Controllers\Core;

use App\Models\Core\Group;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GroupController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Group::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Group $group)
    {
        $group = $group->query();

        if ($request->has('filter') && !empty($request->filter)) {
            $group->where('name', 'like', "%{$request->filter}%");
        }

        if ($request->input('deleted') ? $request->boolean('deleted') : false) {
            $group->onlyTrashed();
        }

        $group = $group->orderBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->rowsPerPage ?? 15);
        return new ResourceCollection($group);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Group $group)
    {
        $rules = [
            'name' => 'required|unique:groups',
        ];

        $this->validate($request, $rules);

        $group = $group->create($request->input());

        $permissions = collect($request->permissions)
            ->filter(function ($permission) {
                return !is_null($permission['access']);
            })
            ->mapWithKeys(function ($permission) {
                return [$permission['id'] => [
                    'access' => $permission['access']
                ]];
            });
        $group->permissions()->sync($permissions);

        return response()->json([
            'data' => $group->load('permissions'),
            'message' => 'Group has been created successfully!'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param   $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        return response()->json($this->toArray($group), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Core\Group $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group)
    {
        // Set rules
        $rules = [
            'name' => 'required|unique:groups,name,' . $group->id,
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $group->update($request->input());

        $permissions = collect($request->permissions)
            ->filter(function ($permission) {
                return !is_null($permission['access']);
            })
            ->mapWithKeys(function ($permission) {
                return [$permission['id'] => [
                    'access' => $permission['access']
                ]];
            });
        $group->permissions()->sync($permissions);

        return response()->json([
            'data' => $this->toArray($group->fresh(['permissions'])),
            'message' => 'Group has been updated successfully!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Core\Group $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        $group->delete();
        return response()->json([
            'message' => 'Group has been deleted successfully!'
        ], 200);
    }

    /**
     * Remove the selected resource from storage.
     *
     * @param  \App\Models\Core\Group $group
     * @return \Illuminate\Http\Response
     */
    public function destroy_selected(Request $request, Group $group)
    {
        $this->validate($request, [
            'groups' => 'required',
        ]);
        $group->whereIn('id', $request->groups)->each(function ($item) {
            $item->delete();
        });
        return response()->json([
            'message' => 'Groups has been deleted successfully!',
        ], 200);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Models\Core\Group $group
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        Group::onlyTrashed()
            ->where('id', $id)->each(function ($item) {
                $item->restore();
            });
        return response()->json([
            'message' => 'Group has been restored successfully!',
        ], 200);
    }

    /**
     * Remove the selected resource from storage.
     *
     * @param  \App\Models\Core\Group $group
     * @return \Illuminate\Http\Response
     */
    public function restore_selected(Request $request, Group $group)
    {
        $this->validate($request, [
            'groups' => 'required',
        ]);
        $group->onlyTrashed()
            ->whereIn('id', $request->groups)->each(function ($item) {
                $item->restore();
            });
        return response()->json([
            'message' => 'Groups has been restored successfully!',
        ], 200);
    }

    private function toArray(Group $group)
    {
        $data = $group->toArray();

        $data['permissions'] = $group->permissions->map(function ($permission) {
            return [
                'id' => $permission->id,
                'access' => $permission->pivot->access,
            ];
        });

        return $data;
    }
}
