<?php

namespace App\Traits;

use App\Models\Core\Module;
use Illuminate\Support\Collection;

trait HasPermissionGroup
{
    use HasGroup, HasPermission;

    /**
     * Return all the permissions the model has via groups.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getPermissionsViaGroups(): Collection
    {
        return $this->loadMissing('groups', 'groups.permissions')
            ->groups->flatMap(function ($group) {
                return $group->permissions->filter(function ($permission) {
                    return !is_null($permission->pivot->access);
                });
            })
            ->sort()
            ->values();
    }

    /**
     * Return all the permissions the model has, both directly and via groups.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllPermissions(): Collection
    {
        $permissions = $this->permissions;

        if ($this->groups->count()) {
            $permissions = $permissions->merge($this->getPermissionsViaGroups());
        }

        return $permissions->sort()->values();
    }

    public function getModulesAttribute()
    {
        if ($this->is_supper_admin) {
            $modules = Module::with('permissions')->get();
        } else {
            $permissions = $this->getAllPermissions()
                ->filter(function ($permission) {
                    return $permission->pivot->access == 1;
                });
            $permissionByModule = $permissions->groupBy('module_id');

            $modules = Module::find($permissionByModule->keys())->load('permissions');

            foreach ($modules as &$module) {
                $module['permissions'] = $permissionByModule->get($module->id);
            }
        }

        return $modules;
    }
}
