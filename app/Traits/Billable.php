<?php

namespace App\Traits;

use Laravel\Cashier\Concerns\HandlesTaxes;
use App\Traits\Cashier\ManagesSubscriptions;
use App\Traits\Cashier\ManagesPaymentMethods;
use Laravel\Cashier\Concerns\ManagesCustomer;
use Laravel\Cashier\Concerns\ManagesInvoices;
use Laravel\Cashier\Concerns\PerformsCharges;

trait Billable
{
    use HandlesTaxes;
    use ManagesCustomer;
    use ManagesInvoices;
    use ManagesPaymentMethods;
    use ManagesSubscriptions;
    use PerformsCharges;
}
