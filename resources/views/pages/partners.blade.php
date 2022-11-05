@extends('layouts.page', [
    'header' => '2',
])
@section('content')
    <section class="ttm-row padding_bottom130 box-section">
        <div class="container overflow-hidden">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title margin_bottom15">
                        <div class="title-header text-center">
                            <h4>OUR PARTNERS!</h4>
                            <h2 class="title margin_bottom0">We Work With the Best Partners!</h2>
                        </div>
                    </div>
                    <div class="row ttm-vertical_sep sep_width2 row-equal-height margin_bottom40">
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/aroma_thai_logo.jpg',
                                'url' => 'http://aromathai.co.uk/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/caitlin_allen_acupuncture_logo.png',
                                'url' => 'http://www.caitlinallen.co.uk/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/coach_house_sports_logo.png',
                                'url' => 'http://www.cspc.co.uk/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/cybex_logo.png',
                                'url' => 'http://www.cybexintl.com/',
                            ])
                        </div>
                    </div>
                    <div class="ttm-horizontal_sep sep_width2 width-100"></div>
                    <div class="row ttm-vertical_sep sep_width2 row-equal-height margin_bottom40">
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/farsley_celtic_logo.png',
                                'url' => 'http://www.farsleyceltic.com/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/farsley_flyers_logo.png',
                                'url' => 'https://www.facebook.com/FarsleyFlyers',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/les_mills_logo.jpg',
                                'url' => 'http://www.lesmills.com/workouts/all/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/metafit_logo.jpg',
                                'url' => 'http://www.metafit-training.com/',
                            ])
                        </div>
                    </div>
                    <div class="ttm-horizontal_sep sep_width2 width-100"></div>
                    <div class="row ttm-vertical_sep sep_width2 row-equal-height margin_bottom40">
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/on_logo.jpg',
                                'url' => 'http://www.onacademy.co.uk/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/pro-beauty28.jpg',
                                'url' => 'http://instagram.com/probeauty28byharrietramsay/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/families_need_fathers_logo.jpg',
                                'url' => 'http://www.fnfyorkshire.org.uk/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/farsley_travel.png',
                                'url' => 'https://www.myfarsleytravel.co.uk',
                            ])
                        </div>
                    </div>
                    <div class="ttm-horizontal_sep sep_width2 width-100"></div>
                    <div class="row ttm-vertical_sep sep_width2 row-equal-height">
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                            @include('includes.partner', [
                                'image' => 'statics/images/partner/its_grim_up_north_running_logo.png',
                                'url' => 'http://www.itsgrimupnorthrunning.co.uk/',
                            ])
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                        </div>
                        <div class="Clients-wrapper col-lg-3 col-sm-6 col-md-6 col-xs-12">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
