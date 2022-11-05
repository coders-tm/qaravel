<?php

namespace App\Models;

use App\Traits\Core;
use Illuminate\Database\Eloquent\Model;

class ClassList extends Model
{
    use Core;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'capacity',
        'description',
        'urls',
        'extra',
        'is_active',
        'has_description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'urls' => 'collection',
        'is_active' => 'boolean',
        'has_description' => 'boolean',
        'extra' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];
}
