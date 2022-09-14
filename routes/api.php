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

// Auth Routes
Route::prefix('auth/{guard?}')->namespace('Auth')->group(function () {
    Route::post('login', 'AuthController@login')->name('users.login');
    Route::post('forgot-password', 'ForgotPasswordController@request')->name('users.forgot-password');
    Route::post('reset-password', 'ForgotPasswordController@reset')->name('users.reset-password');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', 'AuthController@logout')->name('users.logout');
        Route::post('update', 'AuthController@update')->name('users.update');
        Route::post('change-password', 'AuthController@password')->name('users.change-password');
        Route::post('me', 'AuthController@me')->name('users.current');
    });
});

// Core Routes
Route::namespace('Core')->group(function () {
    Route::middleware(['auth:admins'])->group(function () {
        // Admins
        Route::get('admins/modules', 'AdminController@modules')->name('admins.modules');
        Route::middleware('can:update,admin')->group(function () {
            Route::post('admins/{admin}/reset-password-request', 'AdminController@reset_password_request')->name('admins.reset-password-request');
            Route::post('admins/{admin}/change-active', 'AdminController@change_active')->name('admins.change-active');
            Route::post('admins/{admin}/change-admin', 'AdminController@change_admin')->name('admins.change-admin');
        });
        Route::apiResource('admins', 'AdminController');

        // Groups
        Route::apiResource('groups', 'GroupController');

        // Logs
        Route::post('logs/{log}/reply', 'LogController@reply')->name('logs.reply');
        Route::apiResource('logs', 'LogController')->only([
            'show', 'update', 'destroy',
        ]);
    });
    Route::middleware(['auth:sanctum'])->group(function () {
        // Files
        Route::post('files/upload-from-source', 'FileController@upload_from_source')->name('files.upload_source');
        Route::get('files/{file}/download', 'FileController@download')->name('files.download');
        Route::apiResource('files', 'FileController')->except([
            'destroy_selected', 'restore', 'restore_selected',
        ]);
    });
});

// Admin Routes
Route::namespace('Admin')->middleware(['auth:admins'])->group(function () {
    // Users
    Route::post('users/{user}/reset-password-request', 'UserController@reset_password_request')->name('users.reset-password-request');
    Route::post('users/{user}/change-active', 'UserController@change_active')->name('users.change-active');
    Route::apiResource('users', 'UserController');
});
