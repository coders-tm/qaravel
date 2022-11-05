<?php

namespace App\Traits;

use App\Models\Core\Permission;
use Illuminate\Support\Collection;

trait HasPermission
{
    /**
     * Get all of the permissions for the model
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function permissions()
    {
        return $this->morphToMany(Permission::class, 'permissionable')->withPivot('access');
    }

    public function syncPermissions(Collection $permissions, bool $detach = true)
    {
        $permissions = $permissions->filter(function ($permission) {
            return !is_null($permission['access']);
        })->mapWithKeys(function ($permission) {
            return [$permission['id'] => [
                'access' => $permission['access'],
            ]];
        });
        if ($detach) {
            $this->permissions()->sync($permissions);
        } else {
            $this->permissions()->syncWithoutDetaching($permissions);
        }
        return $this;
    }

    public function syncPermissionsDetaching(Collection $permissions)
    {
        return $this->syncPermissions($permissions, false);
    }

    /**
     * Return all the permissions the model has, both directly.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllPermissions(): Collection
    {
        return $this->permissions->sort()->values();
    }

    public function hasPermission($permission)
    {
        return (bool) $this->getAllPermissions()->where('pivot.access', 1)->where('scope', $permission)->count();
    }

    public function hasAnyPermission(...$permissions)
    {
        return (bool) $this->getAllPermissions()->whereIn('scope', $permissions)->count();
    }
}
