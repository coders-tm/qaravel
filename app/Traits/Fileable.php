<?php

namespace App\Traits;

use App\Models\Core\File;
use App\Traits\HasMorphToOne;

trait Fileable
{
    use HasMorphToOne;

    public function media()
    {
        return $this->morphToMany(File::class, 'fileable');
    }

    public function avatar()
    {
        return $this->morphToOne(File::class, 'fileable')->orderBy('order', 'asc');
    }

    public function thumbnail()
    {
        return $this->morphToOne(File::class, 'fileable')->orderBy('order', 'asc');
    }

    public function syncMedia(array $media)
    {
        if ($media) {
            $files = collect($media)->pluck('id')->filter()->mapWithKeys(function ($item, $key) {
                return [$item => [
                    'order' => $key
                ]];
            });
            $this->media()->sync($files);
        }
        return $this;
    }

    public function detachMedia(array $media)
    {
        if (isset($media['id']) && File::find($media['id'])) {
            return $this->media()->detach($media['id']);
        }
        return false;
    }

    public function attachMedia(array $media)
    {
        if (isset($media['id']) && File::find($media['id'])) {
            return $this->media()->attach($media['id']);
        }
        return false;
    }
}
