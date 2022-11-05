<?php

namespace App\Models;

use App\Traits\Core;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use Core;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'schedule_id',
        'is_stand_by',
        'attendence',
        'status',
        'source',
        'canceled_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'is_stand_by' => 'boolean',
        'attendence' => 'boolean',
        'status' => 'boolean',
        'source' => 'boolean',
        'canceled_at' => 'datetime:d M, Y \a\t h:i a',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
        'updated_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'same_day_canceled'
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'user',
    ];

    /**
     * Get the same_day_canceled
     *
     * @return bool
     */
    public function getSameDayCanceledAttribute()
    {
        return !is_null($this->canceled_at) && $this->canceled_at->dayName == $this->created_at->dayName;
    }

    /**
     * Get the user that owns the Booking
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the schedule that owns the Booking
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function schedule(): BelongsTo
    {
        return $this->belongsTo(ClassSchedule::class, 'schedule_id');
    }

    /**
     * Scope a query to only include onlyActive
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyActive($query)
    {
        return $query->whereNull('canceled_at')->where('is_stand_by', 0);
    }

    /**
     * Scope a query to only include onlyStandBy
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyStandBy($query)
    {
        return $query->whereNull('canceled_at')->where('is_stand_by', 1);
    }

    /**
     * Scope a query to only include onlyNoShow
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyNoShow($query)
    {
        return $query->whereNull('canceled_at')
            ->where('attendence', 0)
            ->whereHas('schedule', function ($schedule) {
                $schedule->whereNotNull('sign_off_at');
            });
    }

    /**
     * Scope a query to only include onlyLastWeekNoShow
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyLastWeekNoShow($query)
    {
        return $query->whereNull('canceled_at')
            ->where('attendence', 0)
            ->whereHas('schedule', function ($schedule) {
                $schedule->havingRaw('date_at BETWEEN ? AND ?', [now()->subDays(7), now()])
                    ->whereNotNull('sign_off_at');
            });
    }
}
