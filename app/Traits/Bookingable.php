<?php

namespace App\Traits;

use App\Models\Booking;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait Bookingable
{
    /**
     * Get all of the bookings for the ClassSchedule
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'schedule_id');
    }

    /**
     * Get all of the active_bookings for the ClassSchedule
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function active_bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'schedule_id')->onlyActive();
    }

    /**
     * Get all of the stand_by_bookings for the ClassSchedule
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function stand_by_bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'schedule_id')->onlyStandBy();
    }

    public function syncActiveBookings(Collection $active_bookings)
    {
        // delete removed active bookings
        $this->active_bookings()->whereNotIn('id', $active_bookings->pluck('id')->filter())->update([
            'canceled_at' => now()
        ]);

        // create or updated new active bookings
        $active_bookings->map(function ($item) {
            return (object) $item;
        })->each(function ($item) {
            $this->active_bookings()->updateOrCreate([
                'id' => optional($item)->id,
            ], [
                'is_stand_by' => false,
                'attendence' => optional($item)->attendence,
                'status' => optional($item)->status,
                'source' => optional($item)->source,
                'canceled_at' => null,
                'user_id' => optional($item)->user ? optional($item)->user['id'] : null,
            ]);
        });

        return $this;
    }

    public function syncStandbyBookings(Collection $stand_by_bookings)
    {
        // delete removed active bookings
        $this->stand_by_bookings()->whereNotIn('id', $stand_by_bookings->pluck('id')->filter())->update([
            'canceled_at' => now()
        ]);

        // create or updated new active bookings
        $stand_by_bookings->map(function ($item) {
            return (object) $item;
        })->each(function ($item) {
            $this->stand_by_bookings()->updateOrCreate([
                'id' => optional($item)->id,
            ], [
                'is_stand_by' => true,
                'attendence' => optional($item)->attendence,
                'status' => optional($item)->status,
                'source' => optional($item)->source,
                'canceled_at' => null,
                'user_id' => optional($item)->user ? optional($item)->user['id'] : null,
            ]);
        });

        return $this;
    }
}
