<header id="masthead" class="header ttm-header-style-04">
    <div class="ttm-topbar-wrapper ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
        <div class="container">
            <ul class="list-inline top-contact  topbar-left text-left">
                <li><i class="fa fa-phone"> </i> 01132 248 510</li>
                <li> <i class="fa fa-envelope-o"></i><a href="mailto:info@pro-fit28.co.uk">info@pro-fit28.co.uk</a></li>
                <li> <i class="ti ti-location-pin"></i> Westbourne House, 60 Bagley Lane</li>
            </ul>
            <div class="topbar-right text-right">
                <div class="ttm-social-links-wrapper list-inline">
                    @include('includes.social')
                </div>
            </div>
        </div>
    </div><!-- ttm-topbar-wrapper end -->
    <div id="site-header-menu" class="site-header-menu ttm-bgcolor-white">
        <div class="site-header-menu-inner ttm-stickable-header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 ">
                        <!--site-navigation -->
                        <div class="site-navigation d-flex flex-row  justify-content-between align-items-center">
                            <!-- site-branding -->
                            <div class="site-branding ">
                                <a class="home-link" href="{{ route('home') }}" title="gimmer" rel="home">
                                    <img id="logo-img" height="45" width="175" class="img-fluid auto_size"
                                        src="{{ asset('images/logo.png') }}" alt="logo-img">
                                </a>
                            </div><!-- site-branding end -->
                            <div class=" d-flex flex-row ">
                                <div class="btn-show-menu-mobile menubar menubar--squeeze">
                                    <span class="menubar-box">
                                        <span class="menubar-inner"></span>
                                    </span>
                                </div>

                                @include('includes.nav-menu')

                                <div class="header_extra d-flex flex-row align-items-center justify-content-end">
                                    <a id="header_btn"
                                        class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor padding_top15 padding_bottom15"
                                        href="javascript:void(0);">GET A APOINTMENT</a>
                                </div>
                            </div>
                        </div><!-- site-navigation end-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
