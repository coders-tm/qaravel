<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="Fitness, Wellbeing Centre" />
    <meta name="description" content="Fitness & Wellbeing Centre | Farsley, Leeds, LS28 5LY" />
    <meta name="author" content="{{ config('app.url') }}" />
    <meta name="viewport" content=" width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>
        {{ $title ?? config('app.name') }} | Fitness & Wellbeing Centre | Farsley, Leeds, LS28 5LY
    </title>
    @include('includes.head-script')
</head>

<body>

    <!--page start-->
    <div class="page">

        @include('includes.header')

        @include('includes.title', [
            'title' => $title,
            'subtitle' => $subtitle,
            'background' => $background,
        ])

        @yield('content')

        @include('includes.footer')
    </div>
    @include('includes.footer-script')
</body>

</html>
