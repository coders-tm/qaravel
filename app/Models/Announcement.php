<?php

namespace App\Models;

use App\Traits\Core;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use Core;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date',
        'open_at',
        'close_at',
        'note',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'datetime:Y-m-d',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'is_closed',
        'date_formated',
        'open_at_formated',
        'close_at_formated',
    ];

    /**
     * Get the is closed
     *
     * @return bool
     */
    public function getIsClosedAttribute()
    {
        return is_null($this->open_at) || is_null($this->close_at) || $this->open_at == $this->close_at;
    }

    /**
     * Get the open at
     *
     * @return string
     */
    public function getOpenAtFormatedAttribute()
    {
        if ($this->open_at) {
            return Carbon::parse($this->open_at)->format('h:i a');
        }
        return $this->open_at;
    }

    /**
     * Get the date formated
     *
     * @return string
     */
    public function getDateFormatedAttribute()
    {
        return $this->date->format('d/m/Y');
    }

    /**
     * Get the close at
     *
     * @return string
     */
    public function getCloseAtFormatedAttribute()
    {
        if ($this->close_at) {
            return Carbon::parse($this->close_at)->format('h:i a');
        }
        return $this->close_at;
    }

    /**
     * Scope a query to only include active
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->whereDate('date', '>=', now())->orderBy('date', 'asc');
    }
}
