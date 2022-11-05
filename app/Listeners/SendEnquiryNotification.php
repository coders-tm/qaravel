<?php

namespace App\Listeners;

use App\Events\EnquiryCreated;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\EnquiryNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class SendEnquiryNotification implements ShouldQueue
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
     * @param  \App\Events\EnquiryCreated  $event
     * @return void
     */
    public function handle(EnquiryCreated $event)
    {
        foreach ([
            'reception@pro-fit28.co.uk' => 'Reception',
            'mramsay@htgmail.co.uk' => 'Mike Ramsay',
            'hramsay@pro-fit28.co.uk' => 'H Ramsay',
        ] as $email => $name) {
            Notification::route('mail', [
                $email => $name
            ])->notify(new EnquiryNotification($event->enquiry));
        }
    }
}
