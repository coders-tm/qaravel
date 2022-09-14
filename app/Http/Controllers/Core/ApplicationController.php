<?php

namespace App\Http\Controllers\Core;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    /**
     * Get stats.
     *
     * @return \Illuminate\Http\Response
     */
    public function stats(Request $request)
    {
        return response()->json([], 200);
    }
}
