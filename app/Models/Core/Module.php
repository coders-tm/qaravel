<?php

namespace App\Models\Core;

use App\Models\Core\Permission;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'icon',
        'url',
        'show_menu',
        'sort_order',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'show_menu' => 'boolean',
    ];

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }
}
