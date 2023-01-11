<?php

namespace App\Traits;

use App\Models\Core\Log;
use Illuminate\Support\Str;

trait Logable
{

    public function logs()
    {
        return $this->morphMany(Log::class, 'logable')->orderBy('created_at', 'desc');
    }

    public function getDisplayableAttribute($attribute, $attributes = [])
    {
        if (isset($attributes[$attribute])) {
            return $attributes[$attribute];
        }
        return str_replace('_', ' ', Str::snake($attribute));
    }

    protected static function boot()
    {
        parent::boot();
        static::created(function ($model) {
            $modelName = class_basename(get_class($model));
            $model->logs()->create([
                'type' => "created",
                'message' => "{$modelName} has been created.",
            ]);
        });
        static::deleted(function ($model) {
            $modelName = class_basename(get_class($model));
            $model->logs()->create([
                'type' => "deleted",
                'message' => "{$modelName} has been deleted.",
            ]);
        });
        static::updated(function ($model) {
            $modelName = class_basename(get_class($model));
            $options = [];
            foreach ($model->getFillable() as $key) {
                if ($model->wasChanged($key)) {
                    $options[$key] = [
                        'previous' => $model->getOriginal($key),
                        'current' => $model[$key],
                    ];
                }
            }
            $model->logs()->create([
                'type' => "updated",
                'message' => "{$modelName} has been updated.",
                'options' => $options
            ]);
        });
        if (method_exists(static::class, 'restored')) {
            static::restored(function ($model) {
                $modelName = class_basename(get_class($model));
                $model->logs()->create([
                    'type' => "restored",
                    'message' => "{$modelName} has been restored.",
                ]);
            });
        }
    }
}
