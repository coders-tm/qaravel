<script src="{{ asset('statics/js/jquery-3.6.0.min.js') }}"></script>
<script src="{{ asset('statics/js/jquery-migrate-3.3.2.min.js') }}"></script>
<script src="{{ asset('statics/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('statics/js/jquery.easing.js') }}"></script>
<script src="{{ asset('statics/js/jquery-waypoints.js') }}"></script>
<script src="{{ asset('statics/js/jquery-validate.js') }}"></script>
<script src="{{ asset('statics/js/tether.min.js') }}"></script>
<script src="{{ asset('statics/js/jquery.prettyPhoto.js') }}"></script>
<script src="{{ asset('statics/js/numinate.min.js') }}"></script>
<script src="{{ asset('statics/js/imagesloaded.min.js') }}"></script>
<script src="{{ asset('statics/js/slick.min.js') }}"></script>
<script src="{{ asset('statics/js/jquery-isotope.js') }}"></script>
<script src="{{ asset('statics/js/main.js') }}"></script>
<script src="{{ asset('statics/js/fullcalendar/main.js') }}"></script>
@if (request()->is('classes'))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
                height: 'auto',
                themeSystem: 'bootstrap',
                firstDay: '1',
                timeZone: 'Europe/London',
                initialView: 'listWeek',
                headerToolbar: {
                    start: 'title',
                    center: '',
                    end: 'today prev next'
                },
                buttonIcons: {
                    close: 'fa-times',
                    prev: 'fa-angle-left',
                    next: 'fa-angle-right'
                },
                titleFormat: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                },
                dayMaxEvents: true,
                events: {
                    url: "{{ route('class-schedules.list') }}",
                    extraParams: {
                        hasClass: true
                    },
                    startParam: 'startOfWeek',
                    endParam: 'endOfWeek',
                },
                eventTimeFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                },
            });

            calendar.render();
        });
    </script>
@endif
@if (request()->is('contact'))
    <script>
        if ($("#contactUsForm").length > 0) {
            $("#contactUsForm").validate({
                rules: {
                    name: {
                        required: true,
                        maxlength: 50
                    },
                    email: {
                        required: true,
                        maxlength: 50,
                        email: true,
                    },
                    message: {
                        required: true,
                        maxlength: 300
                    },
                },
                messages: {
                    name: {
                        required: "Please enter name",
                        maxlength: "Your name maxlength should be 50 characters long."
                    },
                    phone: {
                        required: "Please enter valid contact number",
                        maxlength: "Your name maxlength should be 50 characters long."
                    },
                    email: {
                        required: "Please enter valid email",
                        email: "Please enter valid email",
                        maxlength: "The email name should less than or equal to 50 characters",
                    },
                    message: {
                        required: "Please enter message",
                        maxlength: "Your message name maxlength should be 300 characters long."
                    },
                },
                submitHandler: function(form) {
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                    $('#submit').html('Please Wait...');
                    $("#submit").attr("disabled", true);
                    $.ajax({
                        url: "{{ route('contact.submit') }}",
                        type: "POST",
                        data: $('#contactUsForm').serialize(),
                        success: function(response) {
                            $('#submit').html('Submit');
                            $("#submit").attr("disabled", false);
                            $("#form-success").show();
                            document.getElementById("contactUsForm").reset();
                            setTimeout(() => {
                                $("#form-success").hide();
                            }, 6000);
                        }
                    });
                }
            })
        }
    </script>
@endif
@if (request()->is('membership/register*'))
    <script>
        if ($("#registration_form").length > 0) {
            $("#registration_form").validate({
                rules: {
                    name: {
                        required: true,
                        maxlength: 50
                    },
                    email: {
                        required: true,
                        maxlength: 50,
                        email: true,
                    },
                    message: {
                        required: true,
                        maxlength: 300
                    },
                },
                messages: {
                    first_name: {
                        required: "Please enter your first name",
                        maxlength: "Your name maxlength should be 50 characters long."
                    },
                    last_name: {
                        required: "Please enter your last name",
                        maxlength: "Your name maxlength should be 50 characters long."
                    },
                    phone_number: {
                        required: "Please enter valid phone number",
                        maxlength: "Your name maxlength should be 50 characters long."
                    },
                    email: {
                        required: "Please enter valid email",
                        email: "Please enter valid email",
                        maxlength: "The email name should less than or equal to 50 characters",
                    },
                    message: {
                        required: "Please enter message",
                        maxlength: "Your message name maxlength should be 300 characters long."
                    },
                },
                submitHandler: function(form) {
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                    $('#submit').html('Please Wait...');
                    $("#submit").attr("disabled", true);
                    $.ajax({
                        url: "{{ route('membership.register-submit') }}",
                        type: "POST",
                        data: $('#registration_form').serialize(),
                        success: function(response) {
                            $('#submit').html('Submit');
                            $("#submit").attr("disabled", false);
                            $("#form-success").show();
                            document.getElementById("registration_form").reset();
                            setTimeout(() => {
                                $("#form-success").hide();
                            }, 6000);
                        }
                    });
                }
            })
        }
    </script>
@endif
