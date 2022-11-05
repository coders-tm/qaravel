<?php

namespace App\Models;

use App\Traits\Core;
use App\Traits\Fileable;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use Core, Fileable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tag_line',
        'title_line_1',
        'title_line_2',
        'order',
        'is_active',
        'button',
        'link',
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

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'thumbnail',
    ];
}
