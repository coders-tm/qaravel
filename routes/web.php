<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Public file download route
Route::get('files/{path}', 'Core\FileController@download')->name('files.download');

// Frontend routes
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*')->name('web');
