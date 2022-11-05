@extends('layouts.main')
@section('content')
    @if ($offers->count() > 0)
        <div class="banner_slider_wrapper">
            <div class="banner_slider banner_slider_2">
                @foreach ($offers as $offer)
                    @php
                        $thumbnail = $offer->thumbnail ? $offer->thumbnail->url : asset('statics/images/slider-image-111.png');
                    @endphp
                    <div class="slide" style="background-image: url({{ $thumbnail }});">
                        <div class="slide__content ttm-textcolor-white text-center slide_style1">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="slide__content--headings d-block text-center">
                                            <div class="padding_left30 padding_top10 padding_bottom10">
                                                @if ($offer->tag_line)
                                                    <h3 data-animation="fadeInDown" class="highlight_round text-center">
                                                        {{ $offer->tag_line }}
                                                    </h3>
                                                @endif
                                                @if ($offer->title_line_1)
                                                    <h2 data-animation="fadeInDown" class="text-center">
                                                        {{ $offer->title_line_1 }}
                                                    </h2>
                                                @endif
                                                @if ($offer->title_line_2)
                                                    <h2 data-animation="fadeInDown" class="text-center">
                                                        {{ $offer->title_line_2 }}
                                                    </h2>
                                                @endif
                                                @if ($offer->link)
                                                    <div class="margin_top30 align-items-center res-767-margin_top20"
                                                        data-animation="fadeInUp" data-delay="1.4">
                                                        <a class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-right ttm-btn-color-skincolor"
                                                            href="{{ $offer->link }}">{{ $offer->button ?? 'Read More' }}</a>
                                                    </div>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    <section class="ttm-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="about-img ml_278 res-1199-ml-0 res-991-mr-0">
                        <img class="img-fluid" src="{{ asset('statics/images/centre-layout/all/4.jpg') }}" alt="">
                    </div>
                    <div class="about-img ml_278 margin_top20 res-1199-ml-0 res-991-mr-0">
                        <img class="img-fluid" src="{{ asset('statics/images/single-img-23.png') }}" alt="">
                    </div>
                </div>
                <div class="col-lg-6 padding_top25 padding_left55 res-991-padding_left15">
                    <div class="res-991-mt-50">
                        <div class="section-title padding_bottom0 clearfix">
                            <div class="title-header">
                                <h4>ABOUT US</h4>
                                <h2 class="title">Introducing ProFIT28 a different Fitness & Wellbeing Centre</h2>
                            </div>
                        </div>
                        <p>
                            Our Gym, Studios, Fitness & Wellbeing Centre is based in our wonderful Grade II building with
                            modern facilities throughout the three floor layout. We focus on providing the best members
                            experience possible which start with our well maintained private grounds and car parking through
                            to our fitness and wellbeing areas within the building.
                        </p>
                        <p>
                            We operate a NO Contract membership arrangement, see our membership page for more information.
                        </p>
                        <p>
                            Our Reception is warm and welcoming which would not look out of place in a high end spa along
                            with our members area. Our focus is our members, from a welcoming smile and assistance during
                            each and every visit. We want to ensure every member feels valued and special as part of our
                            ProFIT28 community.
                        </p>
                        <ul
                            class="padding_top15 ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">The Functional Training Zone on the ground floor.</div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">Fitness and Wellbeing Studio on the first floor.</div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">Cycling Studio on the first floor.</div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">Modern and Luxury Changing Facilities</div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">ProFIT28 offers weights, conditioning, cardio and wellbeing
                                    areas on each floor to provide variety and different experiences.</div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">Our top floor is open plan with natural daylight offering a
                                    great space to train using high end Cybex equipment.</div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">Inclusive of your membership is free access to timetabled
                                    classes that offer a full range of experiences, take time to view our online timetable.
                                </div>
                            </li>
                            <li>
                                <i class="fa fa-check-circle-o"></i>
                                <div class="ttm-list-li-content">Members have access to their own ProFIT28 space via online
                                    or members App to allow them to book and monitor their wellness journey.</div>
                            </li>
                        </ul>
                        <div class="margin_top35 row">
                            <div class="col-sm-8 col-xs-12">
                                <p>
                                    You deserve more so continue your fitness and wellbeing journey with ProFIT28 and join
                                    our Community. Get Ready, Set your Goal, Achieve your Dreams with us, take a tour and
                                    view our facilities and visit our Centre to meet our Team.
                                </p>
                            </div>
                            <div class="col-sm-4 col-xs-12">
                                <div
                                    class="ttm-bgcolor-skincolor text-center
                                    padding_top15 padding_right15 padding_bottom15 padding_left15">
                                    <a href="https://www.youtube.com/watch?v=NrJutC5MH7k" target="_self"
                                        class="ttm_prettyphoto ttm-btn btn-inline ttm-btn-size-md z-index-1" tabindex="0">
                                        <div
                                            class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-white ttm-icon_element-size-lg margin_bottom20">
                                            <i class="fs-60 flaticon flaticon-button"></i>
                                        </div>
                                    </a>
                                    <p class="fs-20"><u>Take a Tour</u></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="ttm-row ttm-bgcolor-grey">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h2>WHY <img style="width: 110px;margin-top: -6px;margin-left: 3px;"
                                    src="{{ asset('images/logo-alt.png') }}" alt="">
                            </h2>
                            <h2 class="title">Our Members Deserve More</h2>
                        </div>
                    </div>
                    <div class="row slick_slider"
                        data-slick='{"slidesToShow": 3, "slidesToScroll": 1, "arrows":false, "autoplay":false, "infinite":true, "responsive": [{"breakpoint":1100,"settings":{"slidesToShow": 3}} , {"breakpoint":1000,"settings":{"slidesToShow": 2}},                {"breakpoint":575,"settings":{"slidesToShow": 1}}]}'>
                        <div class="col-md-4 col-sm-6">
                            <!--featured-imagebox-->
                            <div class="featured-imagebox featured-imagebox-services style1">
                                <!-- featured-thumbnail -->
                                <div class="featured-thumbnail">
                                    <a href="analytic-solutions.html"><img width="742" height="618" class="img-fluid"
                                            src="{{ asset('statics/images/single-img-21.png') }}" alt="image"></a>
                                    <div class="ttm-blog-overlay-iconbox">
                                        <a href="{{ route('centre-layout', ['floor' => 'ground-floor']) }}" tabindex="0">
                                            <i class="ti ti-plus"></i>
                                        </a>
                                    </div>
                                    <div class="cat_block-wrapper">
                                        <span class="cat_block">
                                            <time class="entry-date published" datetime="2020-11-11T04:34:34+00:00">
                                                GET READY
                                            </time>
                                        </span>
                                    </div>
                                </div><!-- featured-thumbnail end-->
                                <div class="featured-content featured-content-post">
                                    <div class="featured-title">
                                        <h3>
                                            <a href="{{ route('centre-layout', ['floor' => 'ground-floor']) }}">
                                                Ground Floor
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="featured-desc">
                                        <p>
                                            Enjoy our Members Area, Reception and Functional Training Zone. We understand
                                            the biggest step is making the decision to visit/join a Gym/Fitness Centre. Here
                                            at ProFIT28 we will make you feel welcome and valued everytime you visit us. We
                                            are proud to be different in the way we deliver the best possible experience to
                                            our Members and Community.
                                            <br>
                                            &nbsp;
                                        </p>
                                    </div>

                                    <div class="ttm-boxbg-icon">
                                        <div class="ttm-service-iconbox">
                                            <div class="ttm-icon">
                                                <img style="width: 65px" src="{{ asset('images/logo-alt.png') }}"
                                                    alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- featured-imagebox end-->
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <!--featured-imagebox-->
                            <div class="featured-imagebox featured-imagebox-services style1">
                                <!-- featured-thumbnail -->
                                <div class="featured-thumbnail">
                                    <a href="analytic-solutions.html"><img width="742" height="618"
                                            class="img-fluid" src="{{ asset('statics/images/single-img-22.png') }}"
                                            alt="image"></a>
                                    <div class="ttm-blog-overlay-iconbox">
                                        <a href="{{ route('centre-layout', ['floor' => 'first-floor']) }}"
                                            tabindex="0">
                                            <i class="ti ti-plus"></i>
                                        </a>
                                    </div>
                                    <div class="cat_block-wrapper">
                                        <span class="cat_block">
                                            <time class="entry-date published" datetime="2020-11-11T04:34:34+00:00">
                                                SET YOUR GOAL
                                            </time>
                                        </span>
                                    </div>
                                </div><!-- featured-thumbnail end-->
                                <div class="featured-content featured-content-post">
                                    <div class="featured-title">
                                        <h3>
                                            <a href="{{ route('centre-layout', ['floor' => 'first-floor']) }}">
                                                First Floor
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="featured-desc">
                                        <p>
                                            Use our Fitness & Wellbeing facilities in our Studios. It is important that it's
                                            your goals we focus on because fitness and wellbeing is a journey and everyone's
                                            journey is different. Our ethos and values are based on everyone receiving the
                                            best service, support, value for money and wrap around care to help you achieve
                                            your goals in a welcoming environment.
                                        </p>
                                    </div>

                                    <div class="ttm-boxbg-icon">
                                        <div class="ttm-service-iconbox">
                                            <div class="ttm-icon">
                                                <img style="width: 65px" src="{{ asset('images/logo-alt.png') }}"
                                                    alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- featured-imagebox end-->
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <!--featured-imagebox-->
                            <div class="featured-imagebox featured-imagebox-services style1">
                                <!-- featured-thumbnail -->
                                <div class="featured-thumbnail">
                                    <a href="analytic-solutions.html"><img width="742" height="618"
                                            class="img-fluid" src="{{ asset('statics/images/single-img-20.png') }}"
                                            alt="image"></a>
                                    <div class="ttm-blog-overlay-iconbox">
                                        <a href="{{ route('centre-layout', ['floor' => 'second-floor']) }}"
                                            tabindex="0">
                                            <i class="ti ti-plus"></i>
                                        </a>
                                    </div>
                                    <div class="cat_block-wrapper">
                                        <span class="cat_block">
                                            <time class="entry-date published" datetime="2020-11-11T04:34:34+00:00">
                                                ACHIEVE YOUR DREAMS
                                            </time>
                                        </span>
                                    </div>
                                </div><!-- featured-thumbnail end-->
                                <div class="featured-content featured-content-post">
                                    <div class="featured-title">
                                        <h3>
                                            <a href="{{ route('centre-layout', ['floor' => 'second-floor']) }}">
                                                Second Floor
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="featured-desc">
                                        <p>
                                            Our top floor is open plan with natural daylight offering a great space to train
                                            using high end Cybex equipment. ProFIT28 understands our Members dreams are
                                            different ranging from entering fitness competitions to simply playing with the
                                            Children/Grandchildren. Across all floors we have the fasciitis, equipment and
                                            support to make your dreams a reality.
                                        </p>
                                    </div>

                                    <div class="ttm-boxbg-icon">
                                        <div class="ttm-service-iconbox">
                                            <div class="ttm-icon">
                                                <img style="width: 65px" src="{{ asset('images/logo-alt.png') }}"
                                                    alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- featured-imagebox end-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
