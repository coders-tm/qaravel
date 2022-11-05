@extends('layouts.page', [
    'title' => 'Fitness For Man',
    'background' => 'title-row',
])
@section('content')
    <div class="ttm-row sidebar ttm-sidebar ttm-bgcolor-white clearfix">
        <div class="container">
            <!-- row -->
            <div class="row">
                <div class="col-lg-3 widget-area sidebar-left">
                    @include('includes.sidebar')
                </div>

                <div class="col-lg-9 col-xs-12 content-area order-lg-2">
                    <!-- ttm-service-single-content-are -->
                    <div class="ttm-service-single-content-area">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="ttm_single_image-wrapper mb-35">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-008-1200x800.jpg') }}"
                                        alt="single-img-fourteen">
                                </div>
                                <h3 class="fs-30 margin_top30">Fitness For Man</h3>
                                <p>As the old saying goes, it takes two to tango. A good diet without physical activity and
                                    regular physical activity daily workout fitness is good will make looking good and
                                    feeling fit is almost difficult. Let’s now take a look at regular physical activity.
                                    Let’s take a look at all the positives of getting active and staying active.</p>

                                <p>ProFit28 surely owes to our loved ones to have a healthy mind in a healthy body. A
                                    nutritious diet, cardio workouts, and thrice-a-week strength training are good for your
                                    heart and increase muscle mass. Combine all of these to reach your fitness goals more
                                    effectively. Consistency is required to gain what you want.</p>
                                <div class="ttm_single_image-wrapper padding_top15 mb-35">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-004-1200x800.jpg') }}"
                                        alt="single-img-fourteen">
                                </div>

                                <h3 class="fs-30 margin_top20">Aerobic exercise & Tendon</h3>
                                <p>The aim of this study is to evaluate if the application of a moderate aerobic exercise
                                    protocol reverses the damage caused by diabetes on the mechanical properties. Aerobic
                                    exercises are mainly show an effect on health-related components of fitness especially
                                    cardiovascular endurance and body composition.</p>

                                <h3 class="fs-30 margin_top20">Cardiovascular & Ligament</h3>
                                <p>The fastest way to increase the strength and function of your cardiovascular system. The
                                    problem is, most people never work their cardiovascular system hard enough to actually
                                    experience these changes. a cardiovascular most important effect is good You must work
                                    within your aerobic zone to achieve these benefits. Let’s focus on this.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
