<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CheckBlockUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:block-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check block users';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        User::whereHas('bookings', function ($q) {
            $q->whereNull('canceled_at')
                ->where('attendence', 0)
                ->whereHas('schedule', function ($q) {
                    $q->havingRaw("date_at = CURDATE()")
                        ->whereNotNull('sign_off_at');
                });
        })->each(function ($user) {
            if ($user->blocked && !$user->blocked->isActive() || !$user->blocked) {
                $blocked = $user->updateOrCreateBlocked();
                $this->info("User #{$user->id} has blocked until {$blocked->release_at}!");
            } else {
                $this->info("User #{$user->id} already blocked until {$user->blocked->release_at}!");
            }
        });
    }
}
