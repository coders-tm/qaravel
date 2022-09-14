<?php

namespace App\Traits\Cashier;

use Illuminate\Support\Arr;
use Laravel\Cashier\Concerns\ManagesPaymentMethods as CashierManagesPaymentMethods;

trait ManagesPaymentMethods
{
    use CashierManagesPaymentMethods;

    public function getDefaultPaymentMethodAttribute()
    {
        if ($this->hasDefaultPaymentMethod()) {
            $method = $this->defaultPaymentMethod();
            return [
                'id' => $method->id,
                'name' => $method->billing_details->name,
                'card' =>  collect($method->card)->only([
                    'brand',
                    'last4',
                    'exp_month',
                    'exp_year',
                ]),
                'brand' => $method->card->brand,
                'card_number' => "XXXX XXXX XXXX {$method->card->last4}",
                'exp_date' => "{$method->card->exp_month}/{$method->card->exp_year}",
            ];
        } else {
            return false;
        }
    }

    public function checkPaymentMethod($last4 = '')
    {
        return $this->getPaymentMethods()->contains('last_four', $last4);
    }

    public function getPaymentMethod($last4 = '')
    {
        return $this->getPaymentMethods()->firstWhere('last_four', $last4);
    }

    public function getPaymentMethods($type = 'card', $parameters = [])
    {
        if (!$this->hasPaymentMethod()) {
            return collect();
        }
        $defaultPaymentMethod = $this->defaultPaymentMethod();
        return $this->paymentMethods($type, $parameters)->map(function ($method) use ($defaultPaymentMethod) {
            return [
                'id' => $method->id,
                'name' => $method->billing_details->name,
                'card' =>  collect($method->card)->only([
                    'brand',
                    'last4',
                    'exp_month',
                    'exp_year',
                ]),
                'brand' => $method->card->brand,
                'card_number' => "XXXX XXXX XXXX {$method->card->last4}",
                'exp_date' => "{$method->card->exp_month}/{$method->card->exp_year}",
                'default' => $defaultPaymentMethod && $defaultPaymentMethod->id == $method->id,
            ];
        });
    }
}
