<?php

namespace App\Http\Controllers\Subscription;

use App\Models\User;
use Stripe\Subscription;
use Stripe\PaymentIntent;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Payment;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Laravel\Cashier\Exceptions\IncompletePayment;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->is_free_forever || !$user->subscribed()) {
            return response()->json([
                'message' => 'Currently you didn\'t subscribed to any plan.',
                'upcomingInvoice' => []
            ], 200);
        }
        $subscription = $user->subscription('default');
        $upcomingInvoice = $user->subscription('default')->upcomingInvoice();

        if ($subscription->canceled()) {
            $subscription['message'] = "You have cancelled your subscription. Your subscription will end on {$subscription->ends_at->format('D d M Y')}";
        } else {
            $subscription['upcomingInvoice'] =  [
                'amount' => $upcomingInvoice->total(),
                'date' => $upcomingInvoice->date()->toFormattedDateString(),
            ];
        }
        return response()->json($subscription, 200);
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'payment_method' => 'required',
            'last_four_digit' => 'required',
            'plan' => 'required',
            // 'payment_interval' => 'required',
        ]);

        $user = $request->user();
        $payment_method = $request->input('payment_method');
        $payment_interval = optional($request)->payment_interval ?? 'month';
        $last_four_digit = $request->input('last_four_digit');
        $plan = $request->input('plan');
        $planID = config('cashier.plans')[$plan][$payment_interval];

        if ($user->subscribed('default') && $user->plan == $plan) {
            abort(403, "You already subscribed to {$plan} plan.");
        }

        try {
            if (!$user->subscribed('default')) {
                $subscription = $user->newSubscription('default', $planID)
                    ->create($payment_method);
            } else {
                if ($user->checkPaymentMethod($last_four_digit)) {
                    $payment_method = $user->getPaymentMethod($last_four_digit)['id'];
                }
                $user->updateDefaultPaymentMethod($payment_method);
                $subscription = $user->subscription('default')->swapAndInvoice($planID);
            }
        } catch (IncompletePayment $exception) {
            return $this->paymentIntents($exception->payment->id);
        }

        //update user plan
        $user->update($request->only('plan'));

        return response()->json(['subscription' => $subscription, 'message' => "You have successfully subscribe to {$plan} plan."]);
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'payment_intent' => 'required',
            'plan' => 'required',
        ]);

        $user = $request->user();
        $payment_intent = $request->input('payment_intent');
        $plan = $request->input('plan');

        try {
            $payment = new Payment(
                Cashier::stripe()->paymentIntents->retrieve(
                    $payment_intent,
                    ['expand' => ['payment_method']]
                )
            );
            if ($payment->isSucceeded()) {
                // confirm the subscription
                $subscription = $user->subscription('default');
                $subscription->stripe_status = Subscription::STATUS_ACTIVE;
                $subscription->save();

                //update user plan
                $user->update($request->only('plan'));
            } else {
                abort(403, 'We are unable to authenticate your payment method. Please choose a different payment method or try again.');
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json(['subscription' => $user->subscription('default'), 'message' => "You have successfully subscribe to {$plan} plan."]);
    }

    public function cancel(Request $request)
    {
        $request->user()->subscription('default')->cancel();

        return response()->json([
            'message' => 'You have successfully cancelled your subscription.'
        ], 200);
    }

    public function resume(Request $request)
    {
        $request->user()->subscription('default')->resume();

        return response()->json([
            'message' => 'You have successfully resume your subscription.'
        ], 200);
    }

    public function invoices(Request $request)
    {
        $invoices = $request->user()->invoices();
        $invoices = $invoices->map(function ($item) {
            return [
                'id' => $item->id,
                'amount' => $item->total(),
                'date' => $item->date()->toFormattedDateString(),
            ];
        });
        return response()->json($this->paginate($invoices, $request->limit ?: 10), 200);
    }

    public function download_invoice(Request $request, $invoiceId)
    {
        return $request->user()->downloadInvoice($invoiceId, [
            'vendor' => config('app.name'),
            'product' => Str::title("{$request->user()->plan} plan"),
        ], 'my-invoice');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public function paginate($items, $perPage = 10, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage)->values(), $items->count(), $perPage, $page, $options);
    }

    /**
     * Creates an intent for payment so we can capture the payment
     * method for the user.
     *
     * @param Request $request The request data from the user.
     */
    public function getSetupIntent(Request $request)
    {
        return $request->user()->createSetupIntent();
    }

    private function paymentIntents($id)
    {
        $payment = new Payment(
            Cashier::stripe()->paymentIntents->retrieve(
                $id,
                ['expand' => ['payment_method']]
            )
        );

        $paymentIntent = Arr::only($payment->asStripePaymentIntent()->toArray(), [
            'id', 'status', 'payment_method_types', 'client_secret', 'payment_method',
        ]);

        $paymentIntent['payment_method'] = Arr::only($paymentIntent['payment_method'] ?? [], 'id');

        return [
            'amount' => $payment->amount(),
            'payment' => $payment,
            'paymentIntent' => array_filter($paymentIntent),
            'paymentMethod' => (string) optional($payment->payment_method)->type,
            'customer' => $payment->customer(),
            'requiresAction' => true,
        ];
    }
}
