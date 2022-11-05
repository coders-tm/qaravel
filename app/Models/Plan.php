<?php

namespace App\Models;

use App\Traits\Core;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use Core;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'label',
        'description',
        'note',
        'admin_fee',
        'monthly_fee',
        'annual_fee',
        'is_active',
        'standard',
        'percentage',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'standard' => 'boolean',
        'percentage' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'plan_fee',
    ];

    /**
     * Get the plan_fee
     *
     * @return string
     */
    public function getPlanFeeAttribute()
    {
        if ($this->monthly_fee > 0) {
            return $this->monthly_fee;
        } else if ($this->annual_fee > 0) {
            return $this->annual_fee;
        } else {
            return 0;
        }
    }
}
