<div class="ttm-pricing-plan margin_bottom30">
    <div class="ttm-p_table-head">
        <div class="ttm-p_table-icon">
            <img style="width: 110px" src="{{ asset('images/logo-alt.png') }}">
        </div>
        <div class="ttm-p_table-title">
            <h3>{{ $label }}
                @if ($price > 0)
                    <span>*</span>
                @endif
            </h3>
            {{-- <p>Salary Level Up To $50k</p> --}}
        </div>
        <div class="ttm-p_table-box-desc"></div>
    </div>
    <ul class="ttm-list ttm-list-style-icon ttm-list-icon-color-darkgrey pt-15 pb-15">
        @if ($price > 0)
            <li>No Contract Membership</li>
            <li>Access to Timetabled Classes</li>
            <li>Functional Training Zone</li>
            <li>Studio</li>
            <li>Cycle Studio</li>
            <li>Cybex Gym Experience </li>
            <li>To feel Valued</li>
        @else
            <li>Request Free Trial</li>
            <li>Book a Visit</li>
            <li>Members Experience</li>
        @endif
        @foreach ($features as $feature)
            <li>
                {{-- <i class="fa fa-long-arrow-right"></i> --}}
                <span class="ttm-list-li-content text-left">{{ $feature }}</span>
            </li>
        @endforeach
    </ul>
    <div class="ttm-p_table-amount @if ($price <= 0) visibility-hidden @endif">
        <span class="cur_symbol">£</span>
        <span class="ttm-ptablebox-price">{{ $price }}</span>
        <span class="pac_frequency">/Per Month</span>
    </div>
    <div class="ttm-p_table-footer">
        <a class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-right ttm-btn-color-skincolor text-center margin_top30 z-index-1"
            href="{{ route('membership.register-form', ['id' => $id]) }}">Enquire</a>
    </div>
</div>
