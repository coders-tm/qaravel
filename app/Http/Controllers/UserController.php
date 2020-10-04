<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = User::with('roles');

        if ($request->has('filter') && !empty($request->filter)) {
            $data->where('name', 'like', $request->filter . '%');
            $data->orWhere('email', 'like', $request->filter . '%');
        }
        $data = $data->orderBy($request->has('order') ? $request->order : 'created_at', $request->has('descending') ? $request->descending : 'desc')
                    ->paginate($request->has('limit') ? $request->limit : 15);
        return response()->json($data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $permissions = Permission::all();
        $permissionsNode = [];
        foreach ($permissions->groupBy('module') as $key => $value) {
            array_push($permissionsNode, array(
                'name' => $key,
                'id' => $key,
                'children' => $value
            ));
        }
        $roles = Role::all();
        $user->load('roles');
        $user->permissions = $user->permissions()->get()->pluck('id');
        return response()->json([
            'user' => $user,
            'permissions' => $permissionsNode,
            'roles' => $roles
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if ($request->email != $user->email) {
            $check = User::where('email', $request->email)->first();
            if ($check) {
                if ($check->id != $user->id) {
                    return response()->json([
                        'Email already assinged to another account.'
                    ], 403);
                }
            }
        }
        $user->update($request->only('name', 'email'));
        $user->roles()->sync(collect($request->roles)->pluck('id'));
        $user->permissions()->sync($request->permissions);
        return response()->json($user->load('roles', 'permissions'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
