<?php

namespace App\Models;

use App\Traits\Billable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use function Illuminate\Events\queueable;

class User extends Admin
{
    use Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'plan',
        'phone_number',
        'calendar_color',
        'is_free_forever',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_free_forever' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'name',
        'member_since',
        'subscribed',
        'has_cancelled',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'avatar',
        'address',
    ];

    /**
     * Get the full name of the user.
     *
     * @return bool
     */
    public function getNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Get the plan of the user.
     *
     * @return bool
     */
    public function getPlanAttribute($value)
    {
        return $this->is_free_forever ? 'both' : $value;
    }

    /**
     * Get the subscribed status of the user.
     *
     * @return bool
     */
    public function getSubscribedAttribute()
    {
        // check is admin user and return true
        if ($this->is_free_forever) return true;

        // check subscription for normal user
        return $this->subscribed() ?: false;
    }

    /**
     * Get the member since of the user.
     *
     * @return bool
     */
    public function getMemberSinceAttribute()
    {
        return $this->created_at->format('Y');
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::updated(queueable(function ($customer) {
            if ($customer->hasStripeId()) {
                $customer->syncStripeCustomerDetails();
            }
        }));
    }
}
