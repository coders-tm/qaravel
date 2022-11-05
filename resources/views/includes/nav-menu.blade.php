<nav class="main-menu menu-mobile" id="menu">
    <ul class="menu">
        <li class="mega-menu-item {{ is_active('/') }}">
            <a href="{{ route('home') }}" class="mega-menu-link">
                Home
            </a>
        </li>
        <li class="mega-menu-item {{ is_active('classes*') }}">
            <a href="{{ route('classes') }}" class="mega-menu-link">
                Classes
            </a>
        </li>
        <li class="mega-menu-item {{ is_active('membership*') }}">
            <a href="{{ route('membership') }}" class="mega-menu-link">
                Membership
            </a>
        </li>
        <li class="mega-menu-item {{ is_active('about', 'contact', 'documents', 'opening-times', 'centre-layout*') }}">
            <a href="javascript:void(0);" class="mega-menu-link">Company</a>
            <ul class="mega-submenu">
                <li class="{{ is_active('about') }}">
                    <a href="{{ route('about') }}">
                        About Us
                    </a>
                </li>
                <li class="{{ is_active('contact') }}">
                    <a href="{{ route('contact') }}">
                        Contact Us
                    </a>
                </li>
                <li class="{{ is_active('documents') }}">
                    <a href="{{ route('documents') }}">
                        Documents
                    </a>
                </li>
                <li class="{{ is_active('opening-times') }}">
                    <a href="{{ route('opening-times') }}">
                        Opening Times
                    </a>
                </li>
                <li class="mega-menu-item {{ is_active('centre-layout*') }}">
                    <a href="{{ route('centre-layout') }}" class="mega-menu-link">
                        Centre Layout
                    </a>
                    <ul class="mega-submenu">
                        <li class="{{ is_active('centre-layout/ground-floor') }}">
                            <a href="{{ route('centre-layout', ['floor' => 'ground-floor']) }}">Ground Floor</a>
                        </li>
                        <li class="{{ is_active('centre-layout/first-floor') }}">
                            <a href="{{ route('centre-layout', ['floor' => 'first-floor']) }}">First Floor</a>
                        </li>
                        <li class="{{ is_active('centre-layout/second-floor') }}">
                            <a href="{{ route('centre-layout', ['floor' => 'second-floor']) }}">Second Floor</a>
                        </li>
                    </ul>
                </li>
                {{-- <li class="{{ is_active('partners') }}">
                    <a href="{{ route('partners') }}">
                        Partners
                    </a>
                </li> --}}
            </ul>
        </li>
        <li class="mega-menu-item">
            <a href="{{ config('app.members_url') }}" class="mega-menu-link">
                Members Login
            </a>
        </li>
    </ul>
</nav>
