<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

trait Core
{
    use SoftDeletes, HasFactory, Logable;

    /**
     * Reload a fresh model instance from the database.
     *
     * @param  array|string  $with
     * @return static|null
     */
    public function fresh($with = [])
    {
        if (!$this->exists) {
            return;
        }

        return $this->find($this->id)->load(is_string($with) ? func_get_args() : $with);
    }
}
