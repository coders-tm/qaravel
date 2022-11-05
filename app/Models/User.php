<?php

namespace App\Models;

use App\Enum\StatusEnum;
use App\Models\Core\Log;
use App\Models\Core\Enquiry;
use App\Traits\HasBelongsToOne;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Admin implements MustVerifyEmail
{
    use HasBelongsToOne;

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
        'phone_number',
        'calendar_color',
        'is_active',
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
        'status' => StatusEnum::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_active' => 'boolean',
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
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'avatar',
        'address',
        'last_login',
    ];

    /**
     * Get the member since of the user.
     *
     * @return bool
     */
    public function getMemberSinceAttribute()
    {
        return $this->created_at->format('Y');
    }

    public function logs()
    {
        return $this->morphMany(Log::class, 'logable')->whereNotIn('type', ['login'])->orderBy('created_at', 'desc');
    }

    public function last_update()
    {
        return $this->morphOne(Log::class, 'logable')->whereNotIn('type', ['login', 'created'])->latestOfMany();
    }

    /**
     * Scope a query to only include onlyActive
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyActive($query)
    {
        return $query->where('is_active', 1);
    }

    protected static function boot()
    {
        parent::boot();
        static::updated(function ($model) {
            Enquiry::withoutEvents(function () use ($model) {
                Enquiry::where('email', $model->getOriginal('email'))->update([
                    'email' => $model->email
                ]);
            });
        });
    }
}
