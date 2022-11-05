{{-- Disable Laravel Routes from Being Indexed on Google --}}
@if (config('app.env') == 'local')
    <meta name="robots" content="noindex">
    <meta name="googlebot" content="noindex">
@endif

<link rel="shortcut icon" href="favicon.ico" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/bootstrap.min.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/animate.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/flaticon.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/font-awesome.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/themify-icons.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/slick.cs') }}s">
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/owl.carousel.cs') }}s">
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/prettyPhoto.cs') }}s">
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/shortcodes.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/main.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/megamenu.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/responsive.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/css/custom.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('statics/js/fullcalendar/main.min.css') }}" />
