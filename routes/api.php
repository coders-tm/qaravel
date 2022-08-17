<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->namespace('Auth')->group(function () {
  Route::post('login', 'AuthController@login')->name("login");
  Route::post('forgot-password', 'ForgotPasswordController@request');
  Route::post('reset-password', 'ForgotPasswordController@reset')->name('password.reset');
  Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', 'AuthController@logout');
    Route::post('update', 'AuthController@update');
    Route::post('password', 'AuthController@password');
    Route::post('me', 'AuthController@me');
  });
});
Route::middleware('auth:sanctum')->group(function () {
  Route::resource('users', 'UserController')->except([
    'edit', 'create'
  ]);
  Route::resource('roles', 'RoleController');
  Route::resource('parmissions', 'PermissionController');
});


