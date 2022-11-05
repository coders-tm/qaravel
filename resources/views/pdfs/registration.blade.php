<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>
        registration-{{ $registration->label }}
    </title>
    <style>
        body {
            font-size: 12px;
            font-family: Helvetica, sans-serif;
        }

        input[type="text"] {
            height: 15px;
        }

        input[type="text"],
        textarea {
            width: 100%;
            margin: 0px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }

        table {
            width: 100%;
        }

        .table td,
        .table th {
            padding: 2px 5px;
        }

        .table th.border,
        .active-table th {
            border-bottom: 1px solid gray;
        }

        .table tbody td.border,
        .active-table tbody td {
            border-bottom: 1px solid gray;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0px;
            right: 0px;
            height: 30px;
        }

        .text-right {
            text-align: right;
        }

        .selected {
            background: #AAFFEB !important;
        }

        .right-heading {
            margin: 0;
            color: #999;
        }

        .no-border {
            border: none !important;
        }

        #signed-off {
            position: absolute;
            top: -5px
        }
    </style>
</head>

<body>
    <main>
        <table cellspacing="0">
            <tr>
                <td colspan="100%">
                    <h2 class="right-heading">ProFIT-28Class Regsiter</h2>
                    <div>Class Name: Body Pump</div>
                    <div>Location: Group Fitness Studio</div>
                </td>
            </tr>
            <tr>
                <td>Day: Monday</td>
                <td>Date: 31/10/2022 </td>
                <td>Start Time: 06:45 </td>
                <td>End Time: 07:30</td>
                <td class="text-right">Instructor: Sarah Roberts</td>
            </tr>
        </table>
        <table style="margin: 15px 0px" cellspacing="0">
            <tbody>
                <tr>
                    <td>
                        <table cellspacing="0" class="active-table table">
                            <thead>
                                <tr>
                                    <th width="10px" align="left">S/N</th>
                                    <th align="left">Name</th>
                                    <th width="50px" align="left">Status</th>
                                    <th class="no-border" width="10px">&nbsp;</th>
                                    <th class="no-border" width="110px" align="center">
                                        Confirm Attendance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @for ($id = 1; $id <= $registration->capacity; $id++)
                                    @php
                                        $booking = isset($registration->active_bookings[$id - 1]) ? $registration->active_bookings[$id - 1] : false;
                                    @endphp
                                    @if ($booking)
                                        <tr>
                                            <td>{{ $id }}</td>
                                            <td>
                                                <span class="@selected($booking->source)">
                                                    {{ $booking->user->name }} ({{ $booking->user->id }})
                                                </span>
                                            </td>
                                            <td>{{ $booking->user->status->value }}</td>
                                            <td class="no-border">&nbsp;</td>
                                            <td class="no-border">
                                                <input type="text" readonly="true">
                                            </td>
                                        </tr>
                                    @else
                                        <tr>
                                            <td>{{ $id }}</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td class="no-border">&nbsp;</td>
                                            <td class="no-border">
                                                <input type="text" readonly="true">
                                            </td>
                                        </tr>
                                    @endif
                                @endfor
                                <tr>
                                    <td style="background: #f6f8cd" colspan="3">
                                        <strong>Standby</strong>
                                    </td>
                                    <td class="no-border">&nbsp;</td>
                                    <td class="no-border">&nbsp;</td>
                                </tr>
                                @for ($id = 1; $id <= 5; $id++)
                                    @php
                                        $booking = isset($registration->stand_by_bookings[$id - 1]) ? $registration->stand_by_bookings[$id - 1] : false;
                                    @endphp
                                    @if ($booking)
                                        <tr>
                                            <td>S{{ $id }}</td>
                                            <td>
                                                <span class="@selected($booking->source)">
                                                    {{ $booking->user->name }} ({{ $booking->user->id }})
                                                </span>
                                            </td>
                                            <td>{{ $booking->user->status->value }}</td>
                                            <td class="no-border">&nbsp;</td>
                                            <td class="no-border">
                                                <input type="text" readonly="true">
                                            </td>
                                        </tr>
                                    @else
                                        <tr>
                                            <td>S{{ $id }}</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td class="no-border">&nbsp;</td>
                                            <td class="no-border">
                                                <input type="text" readonly="true">
                                            </td>
                                        </tr>
                                    @endif
                                @endfor
                            </tbody>
                        </table>
                    </td>
                    <td style="width:120px; padding: 15px" rowspan="4" valign="top">
                        <div style="position: relative">
                            ProFIT28 Sign off <input id="signed-off" type="checkbox" disabled="disabled"
                                @if ($registration->has_sign_off) checked="checked" @endif />
                        </div>
                        @if ($registration->has_sign_off)
                            <div>{{ $registration->admin->name }}<br>{{ $registration->sign_off_at }}</div>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 15px;" colspan="2">
                        <div>Note for INSTRUCTOR</div>
                        <textarea rows="4"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
        <table cellspacing="0">
            <tbody>
                <tr>
                    <td>
                        <table cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>Print Instructor Name:</td>
                                    <td style="width: 110px;">
                                        <input type="text">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sign Instructor:</td>
                                    <td style="width: 110px;">
                                        <input type="text">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date:</td>
                                    <td style="width: 110px;">
                                        <input type="text">
                                    </td>
                                </tr>
                                <tr>
                                    <td>ProFIT28 Staff Sign off:</td>
                                    <td style="width: 110px;">
                                        <input type="text">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>
                        <table cellspacing="0" style="text-align:center;">
                            <tbody>
                                <tr>
                                    <td colspan="4">Condition of training Area</td>
                                </tr>
                                <tr>
                                    <td>Very Poor</td>
                                    <td>Poor</td>
                                    <td>Good</td>
                                    <td>Very Good</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td><input type="checkbox"></td>
                                    <td><input type="checkbox"></td>
                                    <td><input type="checkbox"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</body>

</html>
