<?php

namespace App\Models\Core\Enquiry;

use App\Enum\StatusEnum;
use App\Traits\Fileable;
use App\Models\Core\Enquiry;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reply extends Model
{
    use  HasFactory, Fileable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'message',
        'enquiry_id',
        'user_type',
        'user_id',
        'seen',
        'staff_only',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'media',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'seen' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'created_time'
    ];

    /**
     * Get the created_time
     *
     * @return string
     */
    public function getCreatedTimeAttribute()
    {
        return $this->created_at->format('H:i');
    }

    /**
     * Get the enquiry that owns the Reply
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function enquiry()
    {
        return $this->belongsTo(Enquiry::class);
    }

    /**
     * Get the parent user model (user or admin).
     */
    public function user()
    {
        return $this->morphTo()->withOnly([]);
    }

    /**
     * Scope a query to only include unseen
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUnseen($query)
    {
        return $query->where('seen', 0);
    }

    protected static function booted()
    {
        parent::booted();
        static::creating(function ($model) {
            if ($model->user_type == 'Admin') {
                $model->seen = true;
            }
        });
        static::created(function ($model) {
            if ($model->staff_only) {
                return false;
            }
            if ($model->user_type == 'Admin') {
                $model->enquiry->update([
                    'status' => StatusEnum::STAFF_REPLIED
                ]);
            } else {
                $model->enquiry->update([
                    'status' => StatusEnum::REPLIED
                ]);
            }
        });
        static::addGlobalScope('default', function (Builder $builder) {
            if (auth('users')->check()) {
                $builder->where('staff_only', 0);
            }
        });
    }
}
