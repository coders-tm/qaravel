<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'user',
    ];

    /**
     * Get the user that owns the Post
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include sort by
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSortBy($query, $column, $direction)
    {
        switch ($column) {
            case 'TITLE_ASC':
                $query->orderBy('title', 'asc');
                break;

            case 'TITLE_DESC':
                $query->orderBy('title', 'desc');
                break;

            case 'CREATED_AT_DESC':
                $query->orderBy('created_at', 'desc');
                break;

            case 'CREATED_AT_ASC':
                $query->orderBy('created_at', 'asc');
                break;

            default:
                $query->orderBy($column ?: 'created_at', $direction ?: 'asc');
                break;
        }

        return $query;
    }

    protected static function booted()
    {
        parent::booted();
        static::creating(function ($model) {
            if (empty($model->user_id)) {
                $model->user_id = optional(auth()->user())->id;
            }
        });
    }
}
