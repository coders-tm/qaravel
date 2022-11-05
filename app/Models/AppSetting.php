<?php

namespace App\Models;

use App\Models\Core\File;
use App\Traits\Core;
use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    use Core;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'key',
        'options'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' => 'collection',
    ];

    static public function create($key, array $options = [])
    {
        return static::updateOrCreate([
            'key' => $key
        ], [
            'options' => $options
        ]);
    }

    static public function findByKey(string $key)
    {
        $result = static::where('key', $key)->first();
        return $result ? $result->options : collect([]);
    }
}
