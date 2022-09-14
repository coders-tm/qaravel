<?php

namespace App\Traits;

use App\Models\Core\Log;

trait Logable
{

    public function logs()
    {
        return $this->morphMany(Log::class, 'logable')->orderBy('created_at', 'desc');
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
            $model->logs()->create([
                'type' => "updated",
                'message' => "{$modelName} has been updated.",
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
