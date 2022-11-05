@extends('layouts.page', [
    'title' => 'Advance Gymnastic',
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
                    <div class="res-1024-padding_left30 res-767-padding_left0 res-767-padding_top0 margin_bottom20">
                        <h3 class="fs-30">High Quality Gyms</h3>
                        <p>ProFit28 includes games and challenges to help motivate students to improve flexibility. Once the
                            warm-up and stretching are done, the class moves on to gymnastics skills and exercises that
                            practice rock and rolls and forward rolls at their best.</p>
                    </div>
                    <div class="ttm-service-single-content-area">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="ttm_single_image-wrapper mb-35">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-847x565.jpg') }}"
                                        alt="single-img-fourteen">
                                </div>
                                <h4 class="margin_top30">Self Defence</h4>
                                <p>The main objective of this training program and make girls more confident by empowering
                                    them to defend themselves in times of danger. There are five inter-related elements
                                    necessary to justify the use of deadly force in self-defense.</p>
                                <div class="pt-15 pb-15">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <ul
                                                class="ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">girls more confident by empowering
                                                    </div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">defend themselves in times of danger
                                                    </div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">use of deadly force in self-defense
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-lg-6">
                                            <ul
                                                class="ttm-list ttm-list-style-icon font-weight-normal ttm-list-icon-color-highlight mb-10">
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">The main objective of this training
                                                        programme</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">gymnastics skills and exercises that
                                                        practice</div>
                                                </li>
                                                <li>
                                                    <i class="fa fa-long-arrow-right"></i>
                                                    <div class="ttm-list-li-content">Once the warm-up and stretching are
                                                        done</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <h3 class="fs-30 margin_top20">Psycho Training</h3>
                                <p>Even in the face of these challenges, it is important to find ways to help kids with
                                    autism try and even enjoy fitness. Exercise can prevent or reverse weight gain and has
                                    therapeutic benefits too. Exercise can prevent or reverse weight gain while providing
                                    children with ASD the best alternative method for learning and developing new skills.
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="margin_top10">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-004-1200x800.jpg') }}"
                                        alt="">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="margin_top10">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-005-1200x800.jpg') }}"
                                        alt="">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h3 class="fs-30 margin_top20 margin_bottom5">Health & Fitness</h3>
                                <p>This program is a progression from introductory gymnastics where gymnasts have mastered
                                    basic positions and skills and have learned the correct terminology of the skills. a
                                    best alternative method for learning and developing new skills Gymnasts will learn more
                                    challenging elements and start learning to memorize and string together several skills
                                    for routines.</p>
                                <div class="margin_top30">
                                    <img class="img-fluid"
                                        src="{{ asset('statics/images/portfolio/portfolio-005-1200x800.jpg') }}"
                                        alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
