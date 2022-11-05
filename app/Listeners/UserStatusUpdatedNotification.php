<?php

namespace App\Listeners;

use App\Enum\StatusEnum;
use App\Events\UserStatusUpdated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ActiveMemberNotification;
use App\Notifications\DeactiveMemberNotification;

class UserStatusUpdatedNotification implements ShouldQueue
{

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserStatusUpdated  $event
     * @return void
     */
    public function handle(UserStatusUpdated $event)
    {
        foreach ([
            'reception@pro-fit28.co.uk' => 'Reception',
            'mramsay@htgmail.co.uk' => 'Mike Ramsay',
            'hramsay@pro-fit28.co.uk' => 'H Ramsay',
        ] as $email => $name) {
            if ($event->user->status === StatusEnum::DEACTIVE) {
                Notification::route('mail', [
                    $email => $name
                ])->notify(new DeactiveMemberNotification($event->user, $event->status));
            } else if ($event->user->status === StatusEnum::ACTIVE) {
                Notification::route('mail', [
                    $email => $name
                ])->notify(new ActiveMemberNotification($event->user));
            }
        }
    }
}
