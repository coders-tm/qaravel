<?php

namespace App\Models;

use App\Traits\Core;
use App\Models\Core\Log;
use App\Traits\Fileable;
use App\Traits\Addressable;
use App\Traits\HasPermissionGroup;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class Admin extends User
{
    use Core, Notifiable, HasApiTokens, Addressable, Fileable, HasPermissionGroup;

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
        'is_supper_admin',
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
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_active' => 'boolean',
        'is_supper_admin' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'name',
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
     * Get the full name of the user.
     *
     * @return bool
     */
    public function getNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function last_login()
    {
        return $this->morphOne(Log::class, 'logable')->where('type', 'login')->latestOfMany();
    }

    /**
     * Scope a query to only include sort by
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSortBy($query, $column = 'CREATED_AT_ASC', $direction = 'asc')
    {
        switch ($column) {
            case 'name':
                $query->orderBy('first_name', $direction ?? 'asc');
                break;

            default:
                $query->orderBy($column ?: 'created_at', $direction ?? 'asc');
                break;
        }

        return $query;
    }
}
