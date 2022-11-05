@extends('layouts.page')
@section('content')
    <section class="ttm-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-12">
                    <div class="res-991-margin_bottom15">
                        <div
                            class="featured-icon-box bg-light margin_top0 style4 icon-align-before-content icon-ver_align-top">
                            <div class="style1 widget widget-timing clearfix">
                                <h3 class="widget-title">
                                    <i class="fa fa-clock-o margin_right10"></i>
                                    <span>Our Timings</span>
                                </h3>
                                <div class="textwidget widget-text">
                                    <div class="ttm-pricelistbox-wrapper ">
                                        <div class="ttm-timelist-block-wrapper">
                                            <ul class=" ttm-timelist-block">
                                                @foreach ($openingTimes as $item)
                                                    <li class="@selected($item['is_today'])">
                                                        {{ $item['name'] }}
                                                        @if ($item['is_today'])
                                                            (Today)
                                                        @endif
                                                        <span class="service-time">
                                                            {{ $item['open_at'] }} to {{ $item['close_at'] }}
                                                        </span>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-12">
                    <h4>Changes to Opening/Closing Times</h4>
                    <p>
                        Please find any changes to our standard opening times below.
                    </p>
                    <div class="row announcements">
                        @foreach ($announcements as $item)
                            <div class="col-lg-6 col-md-12 col-sm-12">
                                <div class="res-991-margin_bottom15">
                                    <div class="featured-icon-box style4 icon-align-before-content icon-ver_align-top">
                                        <div class="featured-icon">
                                            <div
                                                class="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-square">
                                                @if ($item->is_closed)
                                                    <i class="fa fa-calendar-times-o"></i>
                                                @else
                                                    <i class="fa fa-calendar-check-o"></i>
                                                @endif
                                            </div>
                                        </div>
                                        <div class="featured-content">
                                            <div class="featured-title">
                                                <h4>
                                                    {{ $item->date->format('d/m/Y') }}
                                                    @if ($item->is_closed)
                                                        (Closed)
                                                    @else
                                                        <i class="fa fa-clock-o"></i>
                                                        {{ $item->open_at_formated }} - {{ $item->close_at_formated }}
                                                    @endif
                                                </h4>
                                                <p class="title">
                                                    {{ $item->note }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach

                        <div class="col-lg-12">
                            {{ $announcements->links() }}
                        </div>

                        @if (!$announcements->count())
                            <div class="col-lg-12">
                                <div class="res-991-margin_bottom15">
                                    <div class="featured-icon-box style4 icon-align-before-content icon-ver_align-top">
                                        <div class="featured-icon">
                                            <div
                                                class="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg ttm-icon_element-style-square">
                                                <i class="fa fa-info"></i>
                                            </div>
                                        </div>
                                        <div class="featured-content">
                                            <div class="featured-title">
                                                <h4>Empty</h4>
                                                {{-- <p class="title">
                                                    No Opening/Closing Time Announcements Found!
                                                </p> --}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
