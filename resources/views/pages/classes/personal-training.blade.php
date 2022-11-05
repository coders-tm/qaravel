@extends('layouts.page', [
    'title' => 'Personal Training',
    'background' => 'title-row-6',
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
                                <div class="ttm_single_image-wrapper margin_bottom30 res-991-margin_bottom30">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-002-1200x800.jpg') }}"
                                        alt="single-img-fourteen">
                                </div>
                                <p>Our fitness professionals ready to help clients reach their fitness goals. Clients hire
                                    trainers for their knowledge and experience, and trainers usually provide one-on-one
                                    training on a short-term or long-term basis at locations including the trainer’s
                                    business, gyms, community centers, and clients’ homes. Your health is our priority.</p>
                                <div class="ttm-horizontal_sep width-100 margin_top30 padding_bottom30"></div>
                                <div class="margin_bottom15">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="ttm_single_image-wrapper margin_bottom30 res-991-margin_bottom30">
                                                <img class="img-fluid"
                                                    src="{{ asset('statics/images/portfolio/portfolio-7-1200x800.jpg') }}"
                                                    alt="single-img-fourteen">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <h3 class="fs-30">Fitness</h3>
                                            <p>Physical fitness is a state of health and well-being and, more specifically,
                                                effective the ability to perform.</p>
                                            <ul
                                                class="ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">I want to express my gratification
                                                        ProFit28</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">All three trainers are talented,
                                                        Professional</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">The good creating workout environment
                                                    </div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">Loving all the new equipment</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">Physical fitness is a state of health
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p class="res-991-margin_top30">Our Personal Trainers ensure you perform exercises safely
                                    while giving you the best results. No matter what your fitness needs one of our friendly
                                    trainers will keep you challenged and motivated.</p>
                                <p>A trainer at ProFit28 gym or health club may give a session on instruction in how to use
                                    exercise equipment. This helps the client use the equipment correctly and gains the most
                                    benefit from it. People may also hire a trainer to provide this service in their homes.
                                    The trainer also updates the plan as the client advances toward the goal.</p>
                            </div>
                            <div class="col-md-12">
                                <div class="margin_top30">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-1-1200x800.jpg') }}"
                                        alt="image">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="margin_top30">
                                    <h3 class="fs-30">Customers Review</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row slick_slider slick-arrows-style2"
                            data-slick='{"slidesToShow": 2, "slidesToScroll": 1, "arrows":true, "autoplay":false, "infinite":true, "responsive": [{"breakpoint":1131,"settings":{"slidesToShow": 1}} , {"breakpoint":992,"settings":{"slidesToShow": 1}},                {"breakpoint":575,"settings":{"slidesToShow": 1}}]}'>
                            <div class="testimonials ttm-testimonial-box-view-style3">
                                <div class="testimonial-avatar res-991-margin_top20">
                                    <div class="testimonial-img">
                                        <img class="img-fluid" src="{{ asset('statics/images/team/team-01-150x150.jpg') }}"
                                            alt="testimonial-img">
                                    </div>
                                </div>
                                <div class="testimonial-content res-991-margin_bottom30">
                                    <blockquote class="testimonial-text">I would always recommend ProFit28 for reaching your
                                        fitness goals. I also referred him to various friends and work colleagues your
                                        fitness goals for training.</blockquote>
                                    <div class="testimonial-bottom">
                                        <div class="testimonial-caption">
                                            <h5>David Smitgh</h5>
                                            <label>Gym Manager</label>
                                        </div>
                                        <div class="star-ratings text-right">
                                            <ul class="rating">
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- testimonials end -->
                            <div class="testimonials ttm-testimonial-box-view-style3">
                                <div class="testimonial-avatar res-991-margin_top20">
                                    <div class="testimonial-img">
                                        <img class="img-fluid" src="{{ asset('statics/images/team/team-05-150x150.jpg') }}"
                                            alt="testimonial-img">
                                    </div>
                                </div>
                                <div class="testimonial-content res-991-margin_bottom30">
                                    <blockquote class="testimonial-text">We highly recommend Anywhere ProFit28! My husband
                                        and I worked out with them at our apartment gym for I worked out with them well over
                                        a year.</blockquote>
                                    <div class="testimonial-bottom">
                                        <div class="testimonial-caption">
                                            <h5>Joan Thompson</h5>
                                            <label>Athletic Trainers</label>
                                        </div>
                                        <div class="star-ratings text-right">
                                            <ul class="rating">
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- testimonials end -->
                            <div class="testimonials ttm-testimonial-box-view-style3">
                                <div class="testimonial-avatar res-991-margin_top20">
                                    <div class="testimonial-img">
                                        <img class="img-fluid" src="{{ asset('statics/images/team/team-01-150x150.jpg') }}"
                                            alt="testimonial-img">
                                    </div>
                                </div>
                                <div class="testimonial-content res-991-margin_bottom30">
                                    <blockquote class="testimonial-text">I would always recommend ProFit28 for reaching your
                                        fitness ProFit28 for reaching your fitness goals. I also referred him to various
                                        friends and work colleagues for training.</blockquote>
                                    <div class="testimonial-bottom">
                                        <div class="testimonial-caption">
                                            <h5>David Smitgh</h5>
                                            <label>Gym Manager</label>
                                        </div>
                                        <div class="star-ratings text-right">
                                            <ul class="rating">
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- testimonials end -->
                            <div class="testimonials ttm-testimonial-box-view-style3">
                                <div class="testimonial-avatar res-991-margin_top20">
                                    <div class="testimonial-img">
                                        <img class="img-fluid"
                                            src="{{ asset('statics/images/team/team-05-150x150.jpg') }}"
                                            alt="testimonial-img">
                                    </div>
                                </div>
                                <div class="testimonial-content res-991-margin_bottom30">
                                    <blockquote class="testimonial-text">We highly recommend Anywhere ProFit28! My husband
                                        and I worked out with them at our apartment gym for I worked out with them well over
                                        a year.</blockquote>
                                    <div class="testimonial-bottom">
                                        <div class="testimonial-caption">
                                            <h5>Joan Thompson</h5>
                                            <label>Athletic Trainers</label>
                                        </div>
                                        <div class="star-ratings text-right">
                                            <ul class="rating">
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                                <li class="active"><i class="fa fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- testimonials end -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
