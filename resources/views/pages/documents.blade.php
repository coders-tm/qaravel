@extends('layouts.page')
@section('content')
    <section class="ttm-row clearfix">
        <div class="container">
            <div class="row">
                @foreach ($documents as $item)
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="res-991-margin_bottom15">
                            <div class="featured-icon-box style4 icon-align-before-content icon-ver_align-top">
                                <div class="featured-icon">
                                    <div
                                        class="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg ttm-icon_element-style-square">
                                        <i class="fa fa-file-{{ $item->icon }}-o"></i>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-title">
                                        <h4>{{ $item->icon }}</h4>
                                        <a href="{{ $item->url }}">
                                            <h6 class="title">
                                                {{ $item->name }}
                                            </h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
