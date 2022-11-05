<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Core\Enquiry;
use Illuminate\Auth\Access\HandlesAuthorization;

class EnquiryPolicy
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
        if (auth()->check()) {
            return true;
        }
        return $admin->can('tickets:list');
    }

    /**
     * Determine whether the admin can view the model.
     *
     * @param  \App\Models\Admin  $admin
     * @param  \App\Models\Core\Enquiry  $enquiry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(Admin $admin, Enquiry $enquiry)
    {
        if (auth()->check()) {
            return $enquiry->email == auth()->user()->email;
        }
        return $admin->can('tickets:view');
    }

    /**
     * Determine whether the admin can create models.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(Admin $admin)
    {
        if (auth()->check()) {
            return true;
        }
        return $admin->can('tickets:new');
    }

    /**
     * Determine whether the admin can update the model.
     *
     * @param  \App\Models\Admin  $admin
     * @param  \App\Models\Core\Enquiry  $enquiry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(Admin $admin, Enquiry $enquiry)
    {
        if (auth()->check()) {
            return $enquiry->email == auth()->user()->email;
        }
        return $admin->can('tickets:edit');
    }

    /**
     * Determine whether the admin can delete the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(Admin $admin)
    {
        return $admin->can('tickets:delete');
    }

    /**
     * Determine whether the admin can restore the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(Admin $admin)
    {
        return $admin->can('tickets:restore');
    }

    /**
     * Determine whether the admin can permanently delete the model.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(Admin $admin)
    {
        return $admin->can('tickets:forceDelete');
    }
}
