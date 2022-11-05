<?php

namespace App\Models\Core;

use App\Models\Admin;
use App\Traits\Fileable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory, Fileable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'message',
        'options',
        'admin_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'logable_type',
        'logable_id',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'date_time',
        'can_edit',
        'created_at_human',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        // 'media',
        // 'admin',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' => 'json',
    ];

    public function getDateTimeAttribute()
    {
        return $this->created_at->format('d M, Y \a\t h:i a');
    }

    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function logable()
    {
        return $this->morphTo();
    }

    /**
     * Get the admin that owns the Log
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function admin()
    {
        return $this->belongsTo(Admin::class)->withOnly([]);
    }

    /**
     * Get all of the logs's reply.
     */
    public function reply()
    {
        return $this->morphMany(static::class, 'logable');
    }

    /**
     * Get the can edit
     *
     * @return bool
     */
    public function getCanEditAttribute()
    {
        return $this->created_at->addMinutes(5)->gt(now());
    }

    protected static function booted()
    {
        parent::booted();
        static::creating(function ($model) {
            if (empty($model->admin_id) && auth('admins')->check()) {
                $model->admin_id = auth('admins')->user()->id ?? null;
            }
        });
    }
}
