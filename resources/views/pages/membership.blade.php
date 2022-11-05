@extends('layouts.page')
@section('content')
    <section class="ttm-row padding_bottom_zero-section res-991-padding_bottom0 res-991-padding_top60 clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h4>MEMBERSHIP PLANS</h4>
                            <h2 class="title margin_bottom0">All Our Membership plans are<br>NO CONTRACT</h2>
                            <p>
                                Fitness & Wellbeing is a Journey, Welcome to ProFIT28 a different Gym, Class, Fitness &
                                Wellbeing Centre
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="ttm-row  clearfix">
        <div class="container">
            <div class="row">
                @foreach ($plans as $key => $plan)
                    <div class="col-lg-4 col-md-12">
                        @include('includes.pricing', $plan)
                    </div>
                @endforeach
            </div>
            <div class="margin_top30">
                * One off setup/admin fee may be applied, all payments via Direct Debit which can be cancelled at any time
                following the cancellation policy.
            </div>
        </div>
    </section>
@endsection
