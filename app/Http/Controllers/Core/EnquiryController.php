<?php

namespace App\Http\Controllers\Core;

use App\Enum\StatusEnum;
use App\Models\Core\Enquiry;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\ResourceCollection;

class EnquiryController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Enquiry::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Enquiry $enquiry)
    {
        $enquiry = $enquiry->query();

        if ($request->filled('filter')) {
            $enquiry->where('subject', 'like', "%{$request->filter}%")
                ->orWhere('email', 'like', "%{$request->filter}%");
        }

        if ($request->filled('type')) {
            $enquiry->whereType($request->type);
        }

        if ($request->filled('status') && auth('admins')->check()) {
            if ($request->status == 'Open') {
                $enquiry->where('status', '<>', StatusEnum::RESOLVED->value);
            } else {
                $enquiry->whereStatus($request->status);
            }
        }

        if ($request->boolean('deleted')) {
            $enquiry->onlyTrashed();
        }

        if (auth()->check()) {
            $enquiry->onlyOwner();
        }

        $enquiry = $enquiry->orderBy(optional($request)->sortBy ?? 'created_at', optional($request)->direction ?? 'desc')
            ->paginate(optional($request)->limit ?: 15);
        return new ResourceCollection($enquiry);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Enquiry $enquiry)
    {
        $rules = [
            'subject' => 'required',
            'message' => 'required',
        ];

        $this->validate($request, $rules);

        $enquiry = $enquiry->create($request->input());

        // Update media
        if ($request->filled('media')) {
            $enquiry = $enquiry->syncMedia($request->input('media'));
        }

        return response()->json([
            'data' => $enquiry->load(['user', 'replies.user', 'media']),
            'message' => 'Support ticket has been created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Core\Enquiry  $enquiry
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Enquiry $enquiry)
    {
        $enquiry = $enquiry->markedAsSeen();
        return response()->json($enquiry->load(['user', 'replies.user', 'media']), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Core\Enquiry  $enquiry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Enquiry $enquiry)
    {
        $enquiry->delete();
        return response()->json([
            'message' => 'Enquiry has been deleted successfully!',
        ], 200);
    }

    /**
     * Create reply for the specified resource.
     *
     * @param  \App\Models\Core\Enquiry  $enquiry
     * @return \Illuminate\Http\Response
     */
    public function reply(Request $request, Enquiry $enquiry)
    {
        $request->validate([
            'message' => 'required',
        ]);

        $reply = $enquiry->createReply($request->input());

        // Update media
        if ($request->filled('media')) {
            $reply = $reply->syncMedia($request->input('media'));
        }

        // Update enquiry status
        if ($request->filled('status')) {
            $enquiry->update($request->only(['status']));
        }

        return response()->json([
            'data' => $reply->fresh(['media', 'user']),
            'message' => 'Reply has been created successfully!',
        ], 200);
    }
}
