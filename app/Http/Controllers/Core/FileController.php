<?php

namespace App\Http\Controllers\Core;

use App\Models\Core\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, File $file)
    {
        $file = $file->query();

        if ($request->has('filter') && !empty($request->filter)) {
            $file->where('original_file_name', 'like', "%{$request->filter}%");
        }

        if ($request->input('deleted') ? $request->boolean('deleted') : false) {
            $file->onlyTrashed();
        }

        $file = $file->orderBy($request->has('order') ? $request->order : 'created_at', $request->has('descending') ? $request->descending : 'desc')
            ->paginate($request->has('limit') ? $request->limit : 15);
        return new ResourceCollection($file);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'media' => 'required',
        ];

        $this->validate($request, $rules);

        $file = new File;
        $file->setHttpFile($request->file('media'));
        $file->save();
        return response()->json(new JsonResource($file->fresh()), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Core\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        return response()->json(new JsonResource($file), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Core\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
        $rules = [
            'media' => 'required',
        ];

        $this->validate($request, $rules);

        $file->setHttpFile($request->file('media'));
        $file->modify();

        return response()->json(new JsonResource($file->fresh()), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Core\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
        Storage::disk($file->disk)->delete($file->path);
        $file = $file->forceDelete();
        return response()->json($file, 200);
    }

    public function download(File $file)
    {
        return Storage::disk($file->disk)->download($file->path, $file->original_file_name);
    }

    public function upload_from_source(Request $request)
    {
        $rules = [
            'source' => 'required',
        ];

        $this->validate($request, $rules);

        $url = $request->input('source');
        $_path = parse_url($url)['path'];
        $paths = explode("/", $_path);
        $name = $paths[count($paths) - 1];
        try {
            $path = "files/" . md5($url) . ".png";
            $media = Http::get($url);
            Storage::disk('public')->put($path, $media);
            // return Storage::disk('local')->download($path, $name);
            $file = new File();
            $file->url = Storage::disk('public')->url($path);
            $file->path = $path;
            $file->original_file_name = $name;
            $file->size = Storage::disk('public')->size($path);
            $file->mime_type = Storage::disk('public')->mimeType($path);
            $file->save();
            $file->update($request->input());
            return response()->json(new JsonResource($file->fresh()), 200);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
