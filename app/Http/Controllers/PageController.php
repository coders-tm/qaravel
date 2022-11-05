<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Offer;
use App\Enum\StatusEnum;
use App\Models\Core\File;
use App\Models\AppSetting;
use App\Models\Announcement;
use App\Models\Core\Enquiry;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;

class PageController extends Controller
{
    public function index()
    {
        $offers = Offer::onlyActive()->orderBy('updated_at', 'desc')->get();
        return view('pages.home.2', [
            'offers' => $offers
        ]);
    }

    public function membership()
    {
        $plans = AppSetting::findByKey('memberships')->where('is_active', true)->all();
        return view('pages.membership', [
            'title' => 'Membership',
            'subtitle' => 'Service',
            'background' => 'title-row-24',
            'plans' => $plans,
        ]);
    }

    public function register_form(Request $request)
    {
        $membership = null;

        if ($request->filled('id')) {
            $membership = AppSetting::findByKey('memberships')->firstWhere('id', $request->input('id'));
        }

        return view('pages.registration', [
            'title' => 'Membership Enquiry',
            'subtitle' => 'Membership',
            'background' => 'title-row-30',
            'membership' => $membership,
            'error' => false,
            'success' => false,
        ]);
    }

    public function register_submit(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'email' => 'required|email',
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
        ]);

        $request->merge([
            'status' => StatusEnum::PENDING->value
        ]);

        $user = User::where(['email' => $request->email])->first();

        if ($user) {
            $user->update($request->only([
                'phone_number',
                'interest',
                'type',
                'note',
                'status'
            ]));
        } else {
            $user = User::create($request->only([
                'title',
                'email',
                'first_name',
                'last_name',
                'phone_number',
                'interest',
                'type',
                'note',
                'status'
            ]));
        }

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your enquiry, we will contact you soon. We sincerely appreciate your interest in ProFit28.'
        ], 200);
    }

    public function opening_times(Request $request)
    {
        $announcements = Announcement::active()->paginate(10);
        $openingTimes = opening_times();
        return view('pages.opening-times', [
            'title' => 'Opening Times',
            'subtitle' => 'Company',
            'background' => 'title-row-25',
            'announcements' => $announcements,
            'openingTimes' => $openingTimes,
        ]);
    }

    public function documents()
    {
        $documents = File::whereIn('id', AppSetting::findByKey('documents')->where('is_active', true)->pluck('id'))->get();
        return view('pages.documents', [
            'title' => 'Documents',
            'subtitle' => 'Company',
            'background' => 'title-row-16',
            'documents' => $documents,
        ]);
    }

    public function centre_layout($floor = 'all')
    {
        $floors = [
            'all' => ['images' => 9, 'title' => 'Centre Layout'],
            'ground-floor' => ['images' => 18, 'title' => 'Ground Floor'],
            'second-floor' => ['images' => 15, 'title' => 'Second Floor'],
            'first-floor' => ['images' => 13, 'title' => 'First Floor'],
        ];
        if (in_array($floor, ['all', 'ground-floor', 'second-floor', 'first-floor'])) {
            return view('pages.centre-layout', [
                'title' => $floors[$floor]['title'],
                'subtitle' => 'Company',
                'background' => 'title-row-16',
                'floor' => $floor,
                'images' => $floors[$floor]['images'],
            ]);
        }

        return redirect()->route('centre-layout');
    }

    public function classes(Request $request)
    {
        return view("pages.classes", [
            'title' => 'Classes',
            'subtitle' => 'Schedule',
            'background' => 'title-row-15',
        ]);
    }

    public function about()
    {
        return view('pages.about-us', [
            'title' => 'About us',
            'subtitle' => 'About us',
            'background' => 'title-row-27',
        ]);
    }

    public function contact()
    {
        return view('pages.contact-us', [
            'title' => 'Contact us',
            'subtitle' => 'Contact us',
            'background' => 'title-row-26',
        ]);
    }

    public function contact_submit(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required',
            'phone' => 'required',
            'message' => 'required',
        ]);

        Enquiry::create($request->only([
            'email',
            'name',
            'phone',
            'message',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Message sent. We will contact you soon.'
        ], 200);
    }

    public function terms()
    {
        return view('pages.terms', [
            'title' => 'Terms & Conditions',
            'subtitle' => 'Company',
            'background' => 'title-row-28',
        ]);
    }

    public function privacy()
    {
        return view('pages.privacy', [
            'title' => 'Privacy Policy',
            'subtitle' => 'Company',
            'background' => 'title-row-29',
        ]);
    }

    public function partners()
    {
        return view('pages.partners', [
            'title' => 'Partners',
            'subtitle' => 'Company',
            'background' => 'title-row-27',
        ]);
    }
}
