<header id="masthead" class="header ttm-header-style-02">
    <div class="top-bar-main ttm-textcolor-white clearfix">
        <div id="site-header-menu" class="site-header-menu">
            <div class="site-header-menu-inner ttm-stickable-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <div class="site-navigation d-flex align-items-center">
                                <div class="site-branding">
                                    <a class="home-link" href="{{ route('home') }}" title="ProFit28" rel="home">
                                        <img id="logo-img" class="img-left" src="{{ asset('images/logo.png') }}"
                                            alt="logo-img">
                                        <img id="logo-dark" class="img-center stickylogo"
                                            src="{{ asset('images/logo-alt.png') }}" alt="logo-img">
                                    </a>
                                </div>
                                <div class="btn-show-menu-mobile menubar menubar--squeeze">
                                    <span class="menubar-box">
                                        <span class="menubar-inner"></span>
                                    </span>
                                </div>

                                @include('includes.nav-menu')

                                <div
                                    class="header_extra ttm-textcolor-white d-flex flex-row align-items-center justify-content-end ml-auto">
                                    <div class="top_bar_contact_item top_bar_social">
                                        @include('includes.social', [
                                            'classes' => 'd-flex',
                                        ])
                                    </div>
                                    <div class="widget_info d-flex flex-row align-items-center justify-content-end">
                                        {{-- <div class="widget_icon ttm-textcolor-skincolor">
                                            <i class="fa fa-comments"></i>
                                        </div> --}}
                                        <div class="widget_content margin_top0">
                                            <h3 class="widget_title">01132 248 510</h3>
                                            {{-- <p>+ 44 01132 248 510</p> --}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
