<?php

namespace App\Models;

use App\Traits\Core;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
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

    /**
     * Get all of the schedules for the Template
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(TemplateSchedule::class);
    }

    /**
     * Get the schedules by day
     *
     * @return collection
     */
    public function getSchedulesByDayAttribute()
    {
        return $this->schedules->groupBy('day.value');
    }

    public function syncSchedules(Collection $schedules)
    {
        // delete removed schedules
        $this->schedules()->whereNotIn('id', $schedules->pluck('id')->filter())->delete();

        // create or updated new schedules
        $schedules->map(function ($item) {
            return (object) $item;
        })->each(function ($schedule) {
            $this->schedules()->updateOrCreate([
                'id' => optional($schedule)->id,
            ], [
                'day' => optional($schedule)->day,
                'start_at' => optional($schedule)->start_at,
                'end_at' => optional($schedule)->end_at,
                'class_id' => optional($schedule)->class ? optional($schedule)->class['id'] : null,
                'location_id' => optional($schedule)->location ? optional($schedule)->location['id'] : null,
                'instructor_id' => optional($schedule)->instructor ? optional($schedule)->instructor['id'] : null,
            ]);
        });

        return $this;
    }
}
