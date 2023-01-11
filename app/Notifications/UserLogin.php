<?php

namespace App\Notifications;

use Illuminate\Http\Request;
use Illuminate\Bus\Queueable;
use Illuminate\Support\HtmlString;
use Illuminate\Notifications\Notification;
use Stevebauman\Location\Facades\Location;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Browser;

class UserLogin extends Notification
{
    use Queueable;

    public $request;
    public $user;
    public $info;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->user = $request->user(guard());
        $location = Location::get($request->ip());
        $location = $location ? "<b>Location</b>: {$location->regionName}, {$location->countryCode}<br/>" : '';
        $browser_name = Browser::browserFamily() . ' on ' . Browser::platformFamily();
        $time = now()->format('M d, Y \a\t g:ia \U\T\C');
        $this->info = "<b>Time</b>: {$time}<br/><b>Device</b>: {$browser_name}<br/>{$location}<b>IP</b>: {$request->ip()}<br/>";
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('A new device has logged in to your account')
            ->greeting("Hi {$this->user->name},")
            ->line('We noticed a new sign in to your account.')
            ->line(new HtmlString($this->info))
            ->line('If this was you, you can safely ignore this email.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
