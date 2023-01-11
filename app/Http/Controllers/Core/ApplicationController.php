<?php

namespace App\Http\Controllers\Core;

use App\Models\User;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    /**
     * Get settings for a key.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_settings($key)
    {
        return response()->json(AppSetting::findByKey($key), 200);
    }

    /**
     * Update settings for a key.
     *
     * @return \Illuminate\Http\Response
     */
    public function update_settings(Request $request)
    {
        $rules = [
            'key' => 'required',
            'options' => 'required',
        ];

        $this->validate($request, $rules);

        AppSetting::create($request->key, $request->options);

        return response()->json([
            'message' => 'App settings has been updated successfully!'
        ], 200);
    }
}
