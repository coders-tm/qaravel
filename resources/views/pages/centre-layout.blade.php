@extends('layouts.page')
@section('content')
    <section class="ttm-row">
        <div class="container">
            <div class="row">
                @if ($floor == 'all')
                    <div class="col-lg-6">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/Dk2WnqsNInc" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen=""></iframe>
                    </div>
                    <div class="col-lg-6 margin_bottom30 res-991-margin_bottom0">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/NrJutC5MH7k"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen=""></iframe>
                    </div>
                @endif
                @for ($i = 1; $i <= $images; $i++)
                    <div
                        class="col-lg-4 col-sm-12 col-md-6 col-xs-12 ttm-box-col-wrapper @if ($i % 3 == 0) margin_bottom30 res-991-margin_bottom0 @endif">
                        @include('includes.pretty-photo', [
                            'gallery' => 'centre-layout',
                            'thumbnail' => "statics/images/centre-layout/{$floor}/thumb/{$i}.jpg",
                            'url' => "statics/images/centre-layout/{$floor}/{$i}.jpg",
                        ])
                    </div>
                @endfor
            </div>
        </div>
    </section>
@endsection
