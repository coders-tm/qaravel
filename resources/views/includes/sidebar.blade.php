<aside class="widget widget-nav-menu with-title">
    @php
        $menus = [['name' => 'Advance Gymnastic', 'slug' => 'advance-gymnastic'], ['name' => 'Fitness For Man', 'slug' => 'fitness-for-man'], ['name' => 'Crosfit Tools', 'slug' => 'crosfit-tools'], ['name' => 'Personal Training', 'slug' => 'personal-training'], ['name' => 'Indoor Cycling', 'slug' => 'indoor-cycling'], ['name' => 'Weight Lifting', 'slug' => 'weight-lifting']];
    @endphp
    <ul>
        @foreach ($menus as $item)
            <li class="{{ is_active("classes/{$item['slug']}") }}">
                <a href="{{ route('classes', ['name' => $item['slug']]) }}">{{ $item['name'] }}</a>
            </li>
        @endforeach
    </ul>
</aside>

<aside class="widget widget-text ttm-bgcolor-white">
    <h3 class="widget-title">Our Location</h3>
    <p>Our fitness professionals ready to help clients reach their fitness goals. Once the warm-up and
        stretching are done.</p>
</aside>
<aside class="widget widget-download">
    <ul class="download">
        <li>
            <i class="fa fa-download"></i>
            <a href="javascript:void(0);">
                <h3 class="fs-20">Download Brochure</h3>
            </a>
        </li>
        <li>
            <i class="fa fa-file-pdf-o"></i>
            <a href="javascript:void(0);">
                <h3 class="fs-20">Characteristics</h3>
            </a>
        </li>
    </ul>
</aside>
<aside class="widget contact-widget">
    <h3 class="widget-title">Get in touch</h3>
    <ul class="contact-widget-wrapper">
        <li>
            <i class="fa fa-map-marker"></i>
            Westbourne House, 60 Bagley Lane, Leeds, LS285LY
        </li>
        <li>
            <i class="fa fa-envelope-o"></i>
            <a href="mailto:info@pro-fit28.co.uk" target="_blank">info@pro-fit28.co.uk</a>
        </li>
        <li>
            <i class="fa fa-phone"></i>01132 248 510
        </li>
    </ul>
</aside>
<aside class="widget widget-banner">
    <div class="ttm-col-bgcolor-yes col-bg-img-seven ttm-col-bgimage-yes ttm-bg padding_bottom60 padding_left25">
        <div class="ttm-col-wrapper-bg-layer ttm-bg-layer">
            <div class="ttm-col-wrapper-bg-layer-inner"></div>
        </div>
        <div class="layer-content">
            <div class="site-branding-main">
                <a class="home-link padding_left0" href="index.html" title="ProFit28" rel="home">
                    <img class="img-left" src="{{ asset('images/logo.png') }}" alt="">
                </a>
            </div>
            <div class="widget-banner-inner">
                <h3>Start Your <span>Health</span> &<br><span>Fitness</span> Journey<br> Today</h3>
            </div>
            <ul class="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor ttm-textcolor-white">
                <li><i class="fa fa-check"></i>
                    <div class="ttm-list-li-content">General Boxing</div>
                </li>
                <li><i class="fa fa-check"></i>
                    <div class="ttm-list-li-content">Fitness & Yoga</div>
                </li>
                <li><i class="fa fa-check"></i>
                    <div class="ttm-list-li-content">Bodybuilder</div>
                </li>
                <li><i class="fa fa-check"></i>
                    <div class="ttm-list-li-content">Weight Lifting</div>
                </li>
            </ul>
            <a class="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor font-weight-600"
                href="blog-single-view.html">JOIN NOW!</a>
        </div>
    </div>
</aside>
