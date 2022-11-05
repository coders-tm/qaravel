@extends('layouts.page')
@section('content')
    <section class="ttm-row padding_bottom_zero-section ttm-vertical_sep res-991-pb-20">
        <div class="container">
            <div class="row ttm-bgcolor-darkgrey padding_top60 padding_bottom45">
                <div class="col-lg-4">
                    <!--featured-icon-box-->
                    <div class="featured-icon-box text-center style13">
                        <div class="featured-icon margin_bottom15">
                            <div
                                class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg ttm-icon_element-style-rounded">
                                <i class="flaticon-phone"></i>
                            </div>
                        </div>
                        <div class="featured-content">
                            <div class="featured-title">
                                <h3 class="ttm-textcolor-white">Phone</h3>
                            </div>
                            <div class="featured-desc">
                                General Enquiries<br>
                                <a href="tel:01132 248 510">01132 248 510</a>
                            </div>
                        </div>
                    </div><!-- featured-icon-box end-->
                </div>
                <div class="col-lg-4">
                    <!--featured-icon-box-->
                    <div class="featured-icon-box text-center style13">
                        <div class="featured-icon margin_bottom15">
                            <div
                                class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg ttm-icon_element-style-rounded">
                                <i class="flaticon-email"></i>
                            </div>
                        </div>
                        <div class="featured-content">
                            <div class="featured-title">
                                <h3 class="ttm-textcolor-white">Emails</h3>
                            </div>
                            <div class="featured-desc">
                                <a href="mailto:info@pro-fit28.co.uk">info@pro-fit28.co.uk</a><br>
                                <a href="mailto:reception@pro-fit28.co.uk">reception@pro-fit28.co.uk</a>
                            </div>
                        </div>
                    </div><!-- featured-icon-box end-->
                </div>
                <div class="col-lg-4">
                    <!--featured-icon-box-->
                    <div class="featured-icon-box text-center style13">
                        <div class="featured-icon margin_bottom15">
                            <div
                                class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg ttm-icon_element-style-rounded">
                                <i class="flaticon-placeholder"></i>
                            </div>
                        </div>
                        <div class="featured-content">
                            <div class="featured-title">
                                <h3 class="ttm-textcolor-white">Address</h3>
                            </div>
                            <div class="featured-desc">Westbourne House, 60 Bagley Lane,<br>Leeds, LS285LY</div>
                        </div>
                    </div><!-- featured-icon-box end-->
                </div>
            </div>
        </div>
    </section>

    <section class="ttm-row contact-section padding_bottom_zero-section clearfix">
        <div class="container">
            <!-- row -->
            <div class="row box-shadow ttm-bgcolor-white p-50 no-gutters">
                <div class="col-lg-5 res-991-padding_bottom30">
                    <img class="img-fluid" src="{{ asset('statics/images/blog/contact-img-470x550.jpg') }}" alt="blog-img">
                </div>
                <div class="col-lg-7">
                    <div class="contact-side res-991-margin_left0">
                        <div class="section-title clearfix">
                            <div class="title-header">
                                <h4>CONTACT NOW</h4>
                                <h2 class="title">Asking Us Anything</h2>
                            </div>
                        </div>
                        <p>We’re here to help and answer any question you might have. We look forward to hearing from you.
                            Feel free to contact us</p>
                        <div class="padding_top10">
                            <form id="contactUsForm" class="request_qoute_form wrap-form clearfix" method="post"
                                novalidate="novalidate">
                                @csrf
                                <div class="row ttm-boxes-spacing-20px">
                                    <div class="col-md-6">
                                        <label>
                                            <span class="text-input">
                                                <input class="@error('name') is-invalid @enderror" name="name"
                                                    type="text" value="" placeholder="Name" required="required">
                                                @error('name')
                                                    <div class="invalid-feedback">
                                                        {{ $message }}
                                                    </div>
                                                @enderror
                                            </span>
                                        </label>
                                    </div>
                                    <div class="col-md-6">
                                        <label>
                                            <span class="text-input">
                                                <input class="@error('phone') is-invalid @enderror" name="phone"
                                                    type="text" value="" placeholder="Phone Number"
                                                    required="required">
                                                @error('phone')
                                                    <div class="invalid-feedback">
                                                        {{ $message }}
                                                    </div>
                                                @enderror
                                        </label>
                                    </div>
                                    <div class="col-md-12">
                                        <label>
                                            <span class="text-input">
                                                <input class="@error('email') is-invalid @enderror" name="email"
                                                    type="text" value="" placeholder="Email" required="required">
                                                @error('email')
                                                    <div class="invalid-feedback">
                                                        {{ $message }}
                                                    </div>
                                                @enderror
                                        </label>
                                    </div>
                                    <div class="col-md-12">
                                        <label>
                                            <span class="text-input">
                                                <textarea class="@error('message') is-invalid @enderror" name="message" rows="4"
                                                    placeholder="Leave a comment or query" required="required"></textarea>
                                                @error('message')
                                                    <div class="invalid-feedback">
                                                        {{ $message }}
                                                    </div>
                                                @enderror
                                            </span>
                                        </label>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="pt-15 mb_20 text-center">
                                            <button
                                                class="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor z-index-1 w-100"
                                                type="submit">SEND NOW!</button>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div id="form-success" style="display: none" class="alert alert-success"
                                            role="alert">
                                            Message sent. We will contact you soon.
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="google_map" class="google_map">
        <div class="map_container clearfix">
            <div id="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2355.4400331194365!2d-1.6648203000000004!3d53.8172472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487be203f9024bff%3A0xc92ede2fe310fa09!2sWestbourne%20House%2C%2060%20Bagley%20Ln%2C%20Farsley%2C%20Pudsey%20LS28%205LY%2C%20UK!5e0!3m2!1sen!2sin!4v1663598139308!5m2!1sen!2sin"
                    width="100" height="550" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </div>
@endsection
