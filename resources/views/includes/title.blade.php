<div class="ttm-page-{{ $background ?? 'title-row' }}">
    <div class="ttm-page-title-row-inner ttm-bgcolor-darkgrey">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="page-title-heading">
                        <h2 class="title">{{ $title ?? 'Title' }}</h2>
                    </div>
                    {{-- @if ($subtitle)
                        <div class="breadcrumb-wrapper">
                            <span>
                                <a title="Home" href="{{ route('home') }}"><i class="fa fa-home"></i>Home</a>
                            </span>
                            <span>{{ $subtitle ?? 'Subtitle' }}</span>
                        </div>
                    @endif --}}
                </div>
            </div>
        </div>
    </div>
</div>
