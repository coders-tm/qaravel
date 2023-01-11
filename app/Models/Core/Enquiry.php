<?php

namespace App\Models\Core;

use App\Enum\StatusEnum;
use App\Models\User;
use App\Traits\Core;
use App\Events\EnquiryCreated;
use App\Models\Core\Enquiry\Reply;
use App\Traits\Fileable;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use Core, Fileable;

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => EnquiryCreated::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'seen',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'last_reply.user',
        'user',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'has_unseen',
    ];

    /**
     * The relationship counts that should be eager loaded on every query.
     *
     * @var array
     */
    protected $withCount = [
        'unseen',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'status' => StatusEnum::class,
        'seen' => 'boolean',
        'created_at' => 'datetime:d M, Y \a\t h:i a',
    ];

    /**
     * Get the has unseen
     *
     * @return bool
     */
    public function getHasUnseenAttribute()
    {
        return $this->unseen_count > 0 || !$this->seen;
    }

    /**
     * Get the name
     *
     * @return string
     */
    public function getNameAttribute($value)
    {
        if ($this->user) {
            return $this->user->name;
        }
        return $value;
    }

    /**
     * Get the phone
     *
     * @return string
     */
    public function getPhoneAttribute($value)
    {
        if ($this->user) {
            return $this->user->phone_number;
        }
        return $value;
    }

    /**
     * Get the user that owns the Enquiry
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email')->withOnly([]);
    }

    /**
     * Get all of the replies for the Enquiry
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function replies()
    {
        return $this->hasMany(Reply::class)->orderBy('created_at', 'desc');
    }

    /**
     * Get the enquiry's most recent reply.
     */
    public function last_reply()
    {
        return $this->hasOne(Reply::class)->latestOfMany();
    }

    /**
     * Get all of the unseen replies for the Enquiry
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function unseen()
    {
        return $this->hasMany(Reply::class)->unseen();
    }

    public function markedAsSeen()
    {
        $this->seen = true;
        $this->unseen()->update([
            'seen' => true
        ]);
        $this->save();
        return $this;
    }

    public function createReply(array $attributes = [])
    {
        $reply = new Reply($attributes);
        $reply->user()->associate(current_user());
        return $this->replies()->save($reply);
    }

    /**
     * Scope a query to only include whereType
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWhereType($query, $type)
    {
        switch ($type) {
            case 'users':
                return $query->whereNotNull('subject');
                break;

            default:
                return $query->whereNull('subject');
                break;
        }
        return $query->where('');
    }

    /**
     * Scope a query to only include onlyOwner
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyOwner($query)
    {
        return $query->whereHas('user', function ($q) {
            $q->where('id', current_user()->id);
        });
    }

    protected static function booted()
    {
        parent::booted();
        static::creating(function ($model) {
            if (empty($model->status)) {
                $model->status = StatusEnum::PENDING->value;
            }
            if (empty($model->email)) {
                $model->email = optional(auth()->user())->email;
            }
        });
    }
}
