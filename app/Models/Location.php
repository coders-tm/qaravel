<?php

namespace App\Models;

use App\Traits\Core;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use Core;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'label',
        'is_active',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];
}
