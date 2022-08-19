<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Post $post
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Post $post)
    {
        $posts = $post->query();

        if ($request->filled('filter')) {
            $posts->where('title', 'like', "%{$request->filter}%");
        }

        $posts = $posts->sortBy(optional($request)->sortBy ?: 'created_at', optional($request)->direction ?: 'desc')
            ->paginate(optional($request)->rowsPerPage ?: 15);
        return new ResourceCollection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Post $post)
    {
        $rules = [
            'title' => 'required',
            'description' => 'required',
        ];

        $this->validate($request, $rules);

        $post = $post->create($request->input());

        return response()->json([
            'data' => $post,
            'message' => 'Post account has been created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response()->json($post, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        // Set rules
        $rules = [
            'title' => 'required',
            'description' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $post->update($request->input());

        return response()->json([
            'data' => $post,
            'message' => 'Post has been updated successfully!',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json([
            'message' => 'Post has been deleted successfully!',
        ], 200);
    }
}
