<?php

namespace App\Traits;

use App\Models\Core\Group;
use Illuminate\Support\Collection;

trait HasGroup
{
    /**
     * Get all of the groups for the model
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function groups()
    {
        return $this->morphToMany(Group::class, 'groupable');
    }

    public function syncGroups(Collection $groups, bool $detach = true)
    {
        $groups = $groups->pluck('id');
        if ($detach) {
            $this->groups()->sync($groups);
        } else {
            $this->groups()->syncWithoutDetaching($groups);
        }
        return $this;
    }

    public function syncGroupsDetaching(Collection $groups)
    {
        return $this->syncGroups($groups, false);
    }

    public function hasGroup(...$groups)
    {
        foreach ($groups as $group) {
            if ($this->groups->contains('name', $group)) {
                return true;
            }
        }
        return false;
    }
}
