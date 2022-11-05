@extends('layouts.page', [
    'title' => 'Weight Lifting',
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
                    <div class="res-1024-padding_left30 res-767-padding_left0 res-767-padding_top0 margin_bottom20">
                        <h3 class="fs-30">Why Is It Good For Me?</h3>
                        <p>A form of high-intensity interval training, CrossFit is a strength, powerful and conditioning
                            workout that is made up of CrossFit is a strength, functional movement performed at a
                            high-intensity level.</p>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="margin_top10 margin_bottom25">
                                <img class="img-fluid"
                                    src="{{ asset('statics/images/portfolio/portfolio-08-1200x800.png') }}" alt="image">
                            </div>
                            <h3 class="fs-30">A Reason of Your Health, Join Today</h3>
                            <p>If you don’t do anything to replace the muscle loss, it’ll be replaced with fat. But weight
                                training can help you.</p>
                            <ul class="ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">CrossFit is a strength and conditioning workout</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">functional movement performed intensity</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">how to focus on proper day-to-day life</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">it will be replaced with fat</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">ProFit28 fitness conduct personal Crossfit</div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <div class="margin_top10 margin_bottom25">
                                <img class="img-fluid"
                                    src="{{ asset('statics/images/portfolio/portfolio-09-1200x800.png') }}" alt="image">
                            </div>
                            <h3 class="fs-30">A Reason of Your Health, Join Today</h3>
                            <p>If you don’t do anything to replace the muscle loss, it’ll be replaced with fat. But weight
                                training can help you.</p>
                            <ul class="ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">high level intensity interval training</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">conditioning workout that is made</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">proper weight & resistance training form</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">you reverse the trend — at any age</div>
                                </li>
                                <li>
                                    <i class="fa fa-long-arrow-right"></i>
                                    <div class="ttm-list-li-content">If you don't anything replace the muscle loss</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 class="fs-30 margin_top30">We Are In This Profession Since 2000 And We Provide The Best Services.
                    </h3>
                    <p>One of our knowledgeable ProFit28 fitness coaches can conduct personal Crossfit exercise sessions and
                        personal trainer train to exercise and a good result at a time and place that is convenient for you.
                    </p>
                    <div class="ttm-progress-bar clearfix" data-percent="95%">
                        <div class="progressbar-title">Weight Lifting</div>
                        <div class="progress-bar-inner">
                            <div class="progress-bar progress-bar-color-bar_skincolor"></div>
                        </div>
                        <div class="progress-bar-percent" data-percentage="95">95%</div>
                    </div>
                    <div class="ttm-progress-bar clearfix" data-percent="90%">
                        <div class="progressbar-title">General Boxing</div>
                        <div class="progress-bar-inner">
                            <div class="progress-bar progress-bar-color-bar_skincolor"></div>
                        </div>
                        <div class="progress-bar-percent" data-percentage="90">90%</div>
                    </div>
                    <div class="ttm-progress-bar clearfix" data-percent="70%">
                        <div class="progressbar-title">Body Building</div>
                        <div class="progress-bar-inner">
                            <div class="progress-bar progress-bar-color-bar_skincolor"></div>
                        </div>
                        <div class="progress-bar-percent" data-percentage="70">70%</div>
                    </div>
                    <div class="ttm-row margin_top60 padding_zero-section ttm-bgcolor-grey slick_slider"
                        data-slick='{"slidesToShow": 5, "slidesToScroll": 1, "arrows":false, "autoplay":false, "infinite":true, "responsive": [{"breakpoint":1200,"settings":{"slidesToShow": 5}}, {"breakpoint":1024,"settings":{"slidesToShow": 4}}, {"breakpoint":777,"settings":{"slidesToShow": 3}},{"breakpoint":575,"settings":{"slidesToShow": 2}},{"breakpoint":400,"settings":{"slidesToShow": 1}}]}'>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-1.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-2.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-3.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-4.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-5.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-2.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="client-box">
                                <div class="ttm-client-logo-tooltip">
                                    <div class="client-thumbnail">
                                        <img class="img-fluid auto_size" width="160" height="98"
                                            src="{{ asset('statics/images/client/client-4.png') }}" alt="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- row end -->

                </div><!-- slick_slider end -->
            </div>
        </div>
    </div>
@endsection
