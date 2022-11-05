@extends('layouts.page')
@section('content')
    <section class="ttm-row contact-section clearfix">
        <div class="container">
            <!-- row -->
            <div class="row box-shadow ttm-bgcolor-white p-50 no-gutters">
                <div class="col-lg-5 res-991-padding_bottom30">
                    <img class="img-fluid" src="{{ asset('statics/images/centre-layout/all/4.jpg') }}" alt="blog-img">
                </div>
                <div class="col-lg-7">
                    <div class="contact-side res-991-margin_left0">
                        <div class="section-title clearfix">
                            <div class="title-header">
                                {{-- <h4>ENQUIRY NOW</h4> --}}
                                <h2 class="title">ProFIT28 Enquiry Form</h2>
                            </div>
                        </div>
                        @if ($membership)
                            <h5>{{ $membership['label'] }} £{{ $membership['price'] }}/month</h5>
                        @endif
                        <p>We’re here to help and answer any question you might have. We look forward to hearing from you.
                            Feel free to contact us</p>
                        <div class="padding_top10">
                            <form id="registration_form" class="registration_form wrap-form clearfix" method="post"
                                novalidate="novalidate">
                                @csrf
                                @if ($membership)
                                    <input type="hidden" name="type" value="{{ $membership['plan']['id'] }}">
                                    <input type="hidden" name="interest" value="{{ $membership['label'] }}">
                                @endif
                                <div class="row ttm-boxes-spacing-20px">
                                    <div class="col-md-6">
                                        <label>
                                            <span class="text-input">
                                                <select class="@error('title') is-invalid @enderror" name="title"
                                                    required="required">
                                                    <option disabled value="">Select</option>
                                                    @foreach (['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr', 'Fr', 'Prof'] as $item)
                                                        <option value="{{ $item }}">{{ $item }}</option>
                                                    @endforeach
                                                </select>
                                                @error('title')
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
                                                <input class="@error('first_name') is-invalid @enderror" name="first_name"
                                                    type="text" value="" placeholder="First name"
                                                    required="required">
                                                @error('first_name')
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
                                                <input class="@error('last_name') is-invalid @enderror" name="last_name"
                                                    type="text" value="" placeholder="Surname" required="required">
                                                @error('last_name')
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
                                                <input class="@error('phone_number') is-invalid @enderror"
                                                    name="phone_number" type="text" value=""
                                                    placeholder="Contact Number" required="required">
                                                @error('phone_number')
                                                    <div class="invalid-feedback">
                                                        {{ $message }}
                                                    </div>
                                                @enderror
                                            </span>
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
                                            </span>
                                        </label>
                                    </div>
                                    <div class="col-md-12">
                                        <label>
                                            <span class="text-input">
                                                <textarea name="note" rows="4" placeholder="Leave a note or query"></textarea>
                                            </span>
                                        </label>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="pt-15 mb_20 text-center">
                                            <button
                                                class="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor z-index-1 w-100"
                                                type="submit">Submit Enquiry</button>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div id="form-success" style="display: none" class="alert alert-success"
                                            role="alert">
                                            Thank you for your enquiry, we will contact you soon. We sincerely
                                            appreciate your interest in ProFit28.
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
@endsection
