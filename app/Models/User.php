<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\HasPermissionsTrait;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Creativeorange\Gravatar\Facades\Gravatar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, MustVerifyEmail, HasPermissionsTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'avater',
        'email',
        'password',
        'is_active',
        'is_admin',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'avatar_url',
        'name',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'avater',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
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

    public function getAvatarUrlAttribute()
    {
        if ($this->avater == null) {
            return Gravatar::get($this->email, ['size' => 200]);
        } else {
            return Storage::disk('public')->url($this->avater);
        }
    }
}
