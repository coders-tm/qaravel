<?php

namespace App\Models;

use App\Traits\Logable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory, Logable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'transaction_id',
        'status',
        'admin_date',
        'starts_at',
        'ends_at',
        'amount',
        'note',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'admin_date' => 'datetime:Y-m-d',
        'starts_at' => 'datetime:Y-m-d',
        'ends_at' => 'datetime:Y-m-d',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'admin_date_formated',
        'starts_at_formated',
        'ends_at_formated',
    ];

    /**
     * Get the user that owns the Payment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin_date_formated
     *
     * @return string
     */
    public function getAdminDateFormatedAttribute()
    {
        return !is_null($this->admin_date) ? $this->admin_date->format('d M, Y') : null;
    }

    /**
     * Get the starts_at_formated
     *
     * @return string
     */
    public function getStartsAtFormatedAttribute()
    {
        return !is_null($this->starts_at) ? $this->starts_at->format('d M, Y') : null;
    }

    /**
     * Get the ends_at_formated
     *
     * @return string
     */
    public function getEndsAtFormatedAttribute()
    {
        return !is_null($this->ends_at) ? $this->ends_at->format('d M, Y') : null;
    }
}
