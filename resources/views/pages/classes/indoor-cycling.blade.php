@extends('layouts.page', [
    'title' => 'Indoor Cycling',
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

                <div class="col-md-12 col-lg-9 col-xs-12 content-area order-lg-2 res-991-margin_bottom0">
                    <!-- ttm-service-single-content-are -->
                    <div class="ttm-service-single-content-area">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="ttm_single_image-wrapper margin_bottom30">
                                    <img class="img-fluid" src="{{ asset('statics/images/bg-img/row-bgimg-2.jpg') }}"
                                        alt="single-img-fourteen">
                                </div>
                                <h3 class="fs-30 margin_top30">Indoor Cycling</h3>
                                <p>Indoor cycling classes help you shed fat, improve your heart health, and boost your
                                    muscle endurance. Your legs will get a serious workout. By the end of class, you’ll have
                                    a steady stream of feel-good brain chemicals called endorphins. Plan to do 3-5 classes a
                                    week for best results. Or usually, add 1-2 classes a week into your workout routine.</p>
                                <div
                                    class="ttm-row fid-section ttm-bgcolor-skincolor res-575-margin_bottom15 ttm-bg res-991-mb_15 style9 clearfix">
                                    <!-- row -->
                                    <div class="row ttm-vertical_sep">
                                        <div class="col-lg-4 col-md-4 col-sm-6">
                                            <!-- ttm-fid -->
                                            <div class="ttm-fid inside">
                                                <div class="ttm-fid-contents">
                                                    <h4 class="ttm-fid-inner">
                                                        <span data-appear-animation="animateDigits" data-from="0"
                                                            data-to="150" data-interval="15" data-before=""
                                                            data-before-style="sup" data-after="" data-after-style="sub"
                                                            class="numinate">150</span><sub>+</sub>
                                                    </h4>
                                                    <h3 class="ttm-fid-title">Happy Clients</h3>
                                                </div>
                                            </div><!-- ttm-fid end -->
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-6">
                                            <!-- ttm-fid -->
                                            <div class="ttm-fid inside">
                                                <div class="ttm-fid-contents">
                                                    <h4 class="ttm-fid-inner">
                                                        <span data-appear-animation="animateDigits" data-from="0"
                                                            data-to="576" data-interval="15" data-before=""
                                                            data-before-style="sup" data-after="" data-after-style="sub"
                                                            class="numinate">576</span><sub>+</sub>
                                                    </h4>
                                                    <h3 class="ttm-fid-title">Expert Trainer</h3>
                                                </div>
                                            </div><!-- ttm-fid end -->
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-6">
                                            <!-- ttm-fid -->
                                            <div class="ttm-fid inside">
                                                <div class="ttm-fid-contents">
                                                    <h4 class="ttm-fid-inner">
                                                        <span data-appear-animation="animateDigits" data-from="0"
                                                            data-to="1850" data-interval="15" data-before=""
                                                            data-before-style="sup" data-after="" data-after-style="sub"
                                                            class="numinate">1850</span><sub>+</sub>
                                                    </h4>
                                                    <h3 class="ttm-fid-title">Years Experience</h3>
                                                </div>
                                            </div><!-- ttm-fid end -->
                                        </div>
                                    </div><!-- row end -->
                                </div>
                                <div class="pt-15 pb-15">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div
                                                class="ttm_single_image-wrapper margin_bottom15 res-991-margin_bottom30 res-991-margin_top40">
                                                <img class="img-fluid"
                                                    src="{{ asset('statics/images/portfolio/portfolio-07-830x470.png') }}"
                                                    alt="single-img-fourteen">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <p>The instructor chooses music to go along with each phase of the class. They
                                                may play an upbeat song for 15 minutes fast </p>
                                            <ul
                                                class="ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">Indoor cycling is a very intense
                                                        exercise.</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">You have been through the real
                                                        adventure</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">We use all the latest equipment for
                                                        cycling</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">A saddle and pedal in a standing
                                                        position</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">It’s a great way to keep boredom at
                                                        bay.</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-4 col-lg-6 col-sm-6 ttm-box-col-wrapper">
                                        <!-- featured-imagebox-team -->
                                        <div class="featured-imagebox featured-imagebox-team style5">
                                            <div class="featured-iconbox ttm-media-link">
                                                <div class="media-block">
                                                    <a href="javascript:void(0);" class="media-btn" tabindex="0"><i
                                                            class="ti ti-plus"></i></a>
                                                    <ul class="social-icons list-inline">
                                                        <li><a href="https://www.facebook.com/themetechMount18"><i
                                                                    class="fa fa-facebook"></i></a></li>
                                                        <li><a href="https://twitter.com/themetechmount"><i
                                                                    class="fa fa-twitter"></i></a></li>
                                                        <li><a href="https://www.linkedin.com/company/themetech-mount/"><i
                                                                    class="fa fa-linkedin"></i></a></li>
                                                        <li><a href="https://www.instagram.com/theme_tech_mount/"><i
                                                                    class="fa fa-pinterest"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="featured-thumbnail">
                                                    <img class="img-fluid"
                                                        src="{{ asset('statics/images/team/team-01.jpg') }}" alt="image">
                                                </div>
                                            </div>
                                            <div class="featured-content featured-content-team">
                                                <div class="featured-title">
                                                    <h3><a href="blog-classic.html">Andrew Bert</a></h3>
                                                </div>
                                                <div class="team-position">Accounts Manager</div>
                                                <a href="our-team.html"
                                                    class="ttm-btn btn-inline ttm-btn-color-skincolor ttm-icon-btn-right fs-14">
                                                    <strong>View Profile<i class="fa fa-long-arrow-right"></i></strong>
                                                </a>
                                            </div>
                                        </div><!-- featured-imagebox-team end-->
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-sm-6 ttm-box-col-wrapper">
                                        <!-- featured-imagebox-team -->
                                        <div class="featured-imagebox featured-imagebox-team style5">
                                            <div class="featured-iconbox ttm-media-link">
                                                <div class="media-block">
                                                    <a href="javascript:void(0);" class="media-btn" tabindex="0"><i
                                                            class="ti ti-plus"></i></a>
                                                    <ul class="social-icons list-inline">
                                                        <li><a href="https://www.facebook.com/themetechMount18"><i
                                                                    class="fa fa-facebook"></i></a></li>
                                                        <li><a href="https://twitter.com/themetechmount"><i
                                                                    class="fa fa-twitter"></i></a></li>
                                                        <li><a href="https://www.linkedin.com/company/themetech-mount/"><i
                                                                    class="fa fa-linkedin"></i></a></li>
                                                        <li><a href="https://www.instagram.com/theme_tech_mount/"><i
                                                                    class="fa fa-pinterest"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="featured-thumbnail">
                                                    <img class="img-fluid"
                                                        src="{{ asset('statics/images/team/team-03.jpg') }}"
                                                        alt="image">
                                                </div>
                                            </div>
                                            <div class="featured-content featured-content-team">
                                                <div class="featured-title">
                                                    <h3><a href="fitness-for-man.html">Michael Bean</a></h3>
                                                </div>
                                                <div class="team-position">Marketing Head</div>
                                                <a href="personal-training.html"
                                                    class="ttm-btn btn-inline ttm-btn-color-skincolor ttm-icon-btn-right fs-14">
                                                    <strong>View Profile<i class="fa fa-long-arrow-right"></i></strong>
                                                </a>
                                            </div>
                                        </div><!-- featured-imagebox-team end-->
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-sm-6 ttm-box-col-wrapper">
                                        <!-- featured-imagebox-team -->
                                        <div class="featured-imagebox featured-imagebox-team style5 res-1199-margin_top30">
                                            <div class="featured-iconbox ttm-media-link">
                                                <div class="media-block">
                                                    <a href="javascript:void(0);" class="media-btn" tabindex="0"><i
                                                            class="ti ti-plus"></i></a>
                                                    <ul class="social-icons list-inline">
                                                        <li><a href="https://www.facebook.com/themetechMount18"><i
                                                                    class="fa fa-facebook"></i></a></li>
                                                        <li><a href="https://twitter.com/themetechmount"><i
                                                                    class="fa fa-twitter"></i></a></li>
                                                        <li><a href="https://www.linkedin.com/company/themetech-mount/"><i
                                                                    class="fa fa-linkedin"></i></a></li>
                                                        <li><a href="https://www.instagram.com/theme_tech_mount/"><i
                                                                    class="fa fa-pinterest"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="featured-thumbnail">
                                                    <img class="img-fluid"
                                                        src="{{ asset('statics/images/team/team-05.jpg') }}"
                                                        alt="image">
                                                </div>
                                            </div>
                                            <div class="featured-content featured-content-team">
                                                <div class="featured-title">
                                                    <h3><a href="services-two.html">John Martin</a></h3>
                                                </div>
                                                <div class="team-position">Finance Head</div>
                                                <a href="faq.html"
                                                    class="ttm-btn btn-inline ttm-btn-color-skincolor ttm-icon-btn-right fs-14">
                                                    <strong>View Profile<i class="fa fa-long-arrow-right"></i>
                                                    </strong>
                                                </a>
                                            </div>
                                        </div><!-- featured-imagebox-team end-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
