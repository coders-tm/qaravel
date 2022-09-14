<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json($request->user()->getPaymentMethods());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'payment_method' => 'required',
            'last_four_digit' => 'required',
        ]);

        $user = $request->user();
        $paymentMethod = $request->input('payment_method');

        if ($user->checkPaymentMethod($request->input('last_four_digit'))) {
            return abort(403, 'Payment method already exists in your account.');
        }

        // create or get stripe customer
        $user->createOrGetStripeCustomer();

        $user->addPaymentMethod($paymentMethod);

        if ($request->boolean('is_default')) {
            $user->updateDefaultPaymentMethod($paymentMethod);
        }

        return response()->json(['message' => "You have successfully added new payment method."]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $paymentMethod)
    {
        $user = $request->user();

        try {
            $user->updateDefaultPaymentMethod($paymentMethod);
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json(['message' => "You have successfully updated default payment method."]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $paymentMethod)
    {
        $user = $request->user();

        try {
            $paymentMethod = $user->findPaymentMethod($paymentMethod);
            $paymentMethod->delete();
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json(['message' => "You have successfully removed payment method."]);
    }
}
