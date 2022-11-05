<?php

namespace App\Notifications;

use App\Models\Core\Enquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Support\HtmlString;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class EnquiryNotification extends Notification
{
    use Queueable;

    public $enquiry;
    public $message;
    public $salutation;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Enquiry $enquiry)
    {
        $this->enquiry = $enquiry;
        $enquiry->message = nl2br($enquiry->message);

        if (empty($this->enquiry->subject)) {
            $this->message = '<p style="color:red"><small>This email was sent through the general enquirey form at pro-fit28.uk/contact</small></p>';
        }

        $this->message .= "<div>{$enquiry->message}</div><br>";
        $this->salutation = "Regards,<br>{$enquiry->name}<br>{$enquiry->email}<br>{$enquiry->phone}";
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
            ->subject($this->enquiry->subject ?? 'Contact Us')
            ->line(new HtmlString($this->message))
            ->salutation(new HtmlString($this->salutation));
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
