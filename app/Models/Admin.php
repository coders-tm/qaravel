<?php

namespace App\Models;

use App\Traits\Core;
use App\Models\Core\Log;
use App\Traits\Fileable;
use App\Traits\Addressable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\HasPermissionGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class Admin extends User
{
    use Notifiable, HasPermissionGroup, HasApiTokens, Fileable, Addressable, Core;

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
            case 'last_login':
                $query->select("{$this->getTable()}.*")
                    ->leftJoin('logs', function ($join) {
                        $join->on('logs.logable_id', '=', "{$this->getTable()}.id")
                            ->where('logs.logable_type', '=', $this->getMorphClass());
                    })
                    ->addSelect(DB::raw('logs.created_at AS last_login'))
                    ->groupBy("{$this->getTable()}.id")
                    ->orderBy('last_login', $direction ?? 'asc');
                break;

            case 'email':
                $query->orderBy('email', $direction ?? 'asc');
                break;

            case 'name':
                $query->select("{$this->getTable()}.*")
                    ->addSelect(DB::raw("CONCAT(`first_name`, `first_name`) AS name"))
                    ->orderBy('name', $direction ?? 'asc');
                break;

            default:
                $query->orderBy($column ?: 'created_at', $direction ?? 'asc');
                break;
        }

        return $query;
    }
}
