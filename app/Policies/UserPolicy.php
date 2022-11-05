<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\Admin  $admin
     * @param  string  $ability
     * @return void|bool
     */
    public function before(Admin $admin, $ability)
    {
        if ($admin->is_supper_admin) {
            return true;
        }
    }

    /**
     * Determine whether the admin can view any models.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(Admin $admin)
    {
        return $admin->can('members:list');
    }

    /**
     * Determine whether the admin can view the model.
     *
     * @param  \App\Models\Admin  $admin
     * @param  \App\Models\User  $enquiry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(Admin $admin, User $user)
    {
        if (auth()->check()) {
            return $user->id == auth()->user()->id;
        }
        return $admin->can('members:view');
    }

    /**
     * Determine whether the admin can create models.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(Admin $admin)
    {
        return $admin->can('members:new');
    }

    /**
     * Determine whether the admin can update the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(Admin $admin)
    {
        return $admin->can('members:edit');
    }

    /**
     * Determine whether the admin can delete the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(Admin $admin)
    {
        return $admin->can('members:delete');
    }

    /**
     * Determine whether the admin can restore the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(Admin $admin)
    {
        return $admin->can('members:restore');
    }

    /**
     * Determine whether the admin can permanently delete the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(Admin $admin)
    {
        return $admin->can('members:forceDelete');
    }
}
