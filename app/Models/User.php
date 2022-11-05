<?php

namespace App\Models;

use App\Enum\RagEnum;
use App\Enum\StatusEnum;
use App\Models\Core\Log;
use App\Models\Core\Enquiry;
use App\Traits\HasBelongsToOne;
use App\Events\UserStatusUpdated;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        // extra
        // 'is_enquiry',
        'title',
        'profit_id',
        'interest',
        'type',
        'best_time_contact',
        'note',
        'status',
        'source',
        'gender',
        'rag',
        'referal_code',
        'plan_id',
        'collect_id',
        'admin_id',
        'assign',
        'username',
        'enq_date',
        'status_change_at',
        'rec',
        'other_rec',
        'foc',
        'mem_rec',
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
        'rag' => RagEnum::class,
        'status' => StatusEnum::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_active' => 'boolean',
        'is_enquiry' => 'boolean',
        'rec' => 'boolean',
        'other_rec' => 'boolean',
        'foc' => 'boolean',
        'mem_rec' => 'boolean',
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
        'profit_id_formated',
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
        return "{$this->title} {$this->first_name} {$this->last_name}";
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
     * Get the profit_id_formated of the user.
     *
     * @return string
     */
    public function getProfitIdFormatedAttribute()
    {
        return "{$this->profit_id}-28{$this->id}";
    }

    /**
     * Get the is_enquiry of the user.
     *
     * @return bool
     */
    public function getIsEnquiryAttribute($value)
    {
        return $this->status != StatusEnum::ACTIVE;
    }

    public function notes()
    {
        return $this->morphMany(Log::class, 'logable')
            ->whereNotIn('type', ['login'])
            ->orderBy('created_at', 'desc')
            ->withOnly(['admin']);
    }

    public function last_update()
    {
        return $this->morphOne(Log::class, 'logable')->whereNotIn('type', ['login', 'created'])->latestOfMany();
    }

    /**
     * Get all of the bookings for the user
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the last_ns_bookings associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function last_ns_bookings(): HasOne
    {
        return $this->hasOne(Booking::class)
            ->withOnly(['schedule'])
            ->onlyNoShow();
    }

    /**
     * The schedules that belong to the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function schedules(): BelongsToMany
    {
        return $this->belongsToMany(ClassSchedule::class, 'bookings', 'user_id', 'schedule_id');
    }

    /**
     * Get the blocked associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function blocked(): HasOne
    {
        return $this->hasOne(Block::class);
    }

    public function updateOrCreateBlocked()
    {
        $this->blocked()->updateOrCreate([
            'user_id' => $this->id
        ], [
            'release_at' => now()->addDays(3)
        ]);
        return $this;
    }

    /**
     * Get all of the payments for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get the payment associated with the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class)->latestOfMany();
    }

    /**
     * Get the plan that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
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

    /**
     * Scope a query to only include onlyMember
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyMember($query)
    {
        return $query->where([
            'status' => StatusEnum::ACTIVE
        ]);
    }

    /**
     * Scope a query to only include onlyEnquiry
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyEnquiry($query)
    {
        return $query->orWhere('status', '<>', StatusEnum::ACTIVE);
    }

    /**
     * Scope a query to only include onlyNoShow
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyNoShow($query)
    {
        return $query->withCount([
            'bookings as ns_bookings_count' => function ($query) {
                $query->onlyNoShow();
            },
        ])->whereHas('bookings', function ($booking) {
            $booking->onlyLastWeekNoShow();
        });
    }

    /**
     * Scope a query to only include onlyBlocked
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyBlocked($query)
    {
        return $query->with('blocked')->whereHas('blocked', function ($booking) {
            $booking->whereDate('release_at', '>=', now());
        });
    }

    /**
     * Scope a query to only include onlyChecked
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param   int $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyChecked($query, int $type = 1)
    {
        return $query->where('foc', $type);
    }

    /**
     * Scope a query to only include onlyMemChecked
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param   int $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyMemChecked($query, int $type = 1)
    {
        return $query->where('mem_rec', $type);
    }

    /**
     * Scope a query to only include onlyCancelled
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param   int $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyCancelled($query)
    {
        return $query->where('status', StatusEnum::DEACTIVE);
    }

    /**
     * Scope a query to only include onlyRolling
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param   bool $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyRolling($query, bool $type = true)
    {
        return $query->whereHas('payment', function ($q) use ($type) {
            if ($type) {
                $q->whereNull('ends_at');
            } else {
                $q->whereNotNull('ends_at');
            }
        })->whereHas('plan', function ($q) {
            $q->where('monthly_fee', '<>', 0);
        });
    }

    /**
     * Scope a query to only include onlyFree
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyFree($query)
    {
        return $query->whereHas('plan', function ($q) {
            $q->where([
                'monthly_fee' => 0,
                'annual_fee' => 0,
            ]);
        });
    }

    /**
     * Scope a query to only include onlyPlan
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param   string $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnlyPlan($query, string $type = 'monthly')
    {
        return $query->whereHas('plan', function ($q) use ($type) {
            $q->where("{$type}_fee", '<>', 0);
        });
    }

    static public function getStats($key)
    {
        $user = static::onlyMember()->where('status', StatusEnum::ACTIVE);

        switch ($key) {
            case 'count':
                return $user->count();
                break;

            case 'checked':
                return $user->onlyChecked()->count();
                break;

            case 'notchecked':
                return $user->onlyChecked(0)->count();
                break;

            case 'rec_checked':
                return $user->onlyMemChecked()->count();
                break;

            case 'rec_notchecked':
                return $user->onlyMemChecked(0)->count();
                break;

            case 'rolling':
                return $user->onlyRolling()->count();
                break;

            case 'ends':
                return $user->onlyRolling(false)->count();
                break;

            case 'monthly':
            case 'annual':
            case 'admin':
                return $user->onlyPlan($key)->count();
                break;

            case 'free':
                return $user->onlyFree()->count();
                break;

            case 'monthly:fee':
            case 'ends:fee':
                return $user->onlyRolling(str($key)->contains('monthly'))->select('users.id', "plans.monthly_fee")->leftJoin('plans', function ($join) {
                    $join->on('plans.id', '=', "users.plan_id");
                })->sum("plans.monthly_fee");
                break;
            case 'annual:fee':
            case 'admin:fee':
                $type = str($key)->replace(':fee', '');
                return $user->select('users.id', "plans.{$type}_fee")->leftJoin('plans', function ($join) {
                    $join->on('plans.id', '=', "users.plan_id");
                })->sum("plans.{$type}_fee");
                break;

            default:
                return 0;
                break;
        }
    }

    static public function getStatsByMonthAndYear($key, $month = null, $year = null)
    {
        $user = static::onlyMember()->where('status', StatusEnum::ACTIVE);

        if ($month && $year) {
            $user->whereHas('payment', function ($q) use ($month, $year) {
                $q->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            });
        }

        switch ($key) {
            case 'total':
                return $user->count();
                break;

            case 'rolling':
                return $user->onlyRolling()->count();
                break;

            case 'end_date':
                return $user->onlyRolling(false)->count();
                break;

            case 'monthly':
            case 'annual':
                return $user->onlyPlan($key)->count();
                break;

            case 'free':
                return $user->onlyFree()->count();
                break;

            case 'cancelled':
                return $user->onlyCancelled()->count();
                break;

            default:
                return 0;
                break;
        }
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->profit_id)) {
                $model->profit_id = now()->format('dmy');
            }
        });
        static::updated(function ($model) {
            Enquiry::withoutEvents(function () use ($model) {
                Enquiry::where('email', $model->getOriginal('email'))->update([
                    'email' => $model->email
                ]);
            });
            if ($model->wasChanged('status')) {
                event(new UserStatusUpdated($model, $model->getOriginal('status')));
            }
        });
    }
}
