<?php

namespace App\Models;

use App\Traits\Core;
use App\Traits\Fileable;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Instructor extends Model
{
    use Core, Fileable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'description',
        'urls',
        'insurance',
        'qualification',
        'onlinefolder',
        'is_pt',
        'hourspw',
        'rentpw',
        'status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'urls' => 'collection',
        'insurance' => 'boolean',
        'qualification' => 'boolean',
        'is_pt' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'has_onlinefolder'
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'avatar',
    ];

    /**
     * The classes that belong to the Instructor
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function classes(): BelongsToMany
    {
        return $this->belongsToMany(ClassList::class, 'instructor_class_lists', 'instructor_id', 'class_id')->withPivot('cost');
    }

    /**
     * Get the has_onlinefolder
     *
     * @return bool
     */
    public function getHasOnlinefolderAttribute()
    {
        return !empty($this->onlinefolder);
    }

    /**
     * Interact with the instructor's onlinefolder.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function onlinefolder(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => !request()->boolean('has_onlinefolder') ? '' : $value,
        );
    }

    public function syncClasses(Collection $classes, bool $detach = true)
    {
        $classes = $classes->mapWithKeys(function ($class) {
            return [$class['id'] => [
                'cost' => isset($class['pivot']['cost']) ? $class['pivot']['cost'] : 0,
            ]];
        });
        if ($detach) {
            $this->classes()->sync($classes);
        } else {
            $this->classes()->syncWithoutDetaching($classes);
        }
        return $this;
    }

    public function syncClassesDetaching(Collection $classes)
    {
        return $this->syncClasses($classes, false);
    }
}
