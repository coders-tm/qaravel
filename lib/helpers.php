<?php

use App\Models\AppSetting;

if (!function_exists('guard')) {
    function guard()
    {
        if (request()->route('guard')) {
            return request()->route('guard');
        } else {
            foreach (array_keys(config('auth.guards')) as $guard) {
                if (auth($guard)->check()) return $guard;
            }
        }
        return config('auth.defaults.guard');
    }
}

if (!function_exists('current_user')) {
    function current_user()
    {
        if (request()->boolean('useToken')) {
            return auth()->user(guard());
        }
        return auth(guard())->user();
    }
}

if (!function_exists('guard_user')) {
    function guard_user($guard)
    {
        return auth($guard)->user();
    }
}

if (!function_exists('app_url')) {
    function app_url($subdomain = 'app')
    {
        $scheme = request()->getScheme();
        if ($subdomain) {
            return "{$scheme}://$subdomain." . config('app.domain');
        }
        return "{$scheme}://" . config('app.domain');
    }
}

if (!function_exists('is_active')) {
    function is_active(...$routes)
    {
        return request()->is($routes) ? 'active' : '';
    }
}

if (!function_exists('app_settings')) {
    function app_settings($key)
    {
        return AppSetting::findByKey($key);
    }
}

if (!function_exists('opening_times')) {
    function opening_times()
    {
        return app_settings('opening-times')->map(function ($item, $key) {
            $item['is_today'] = now()->format('l') == $item['name'];
            return $item;
        });
    }
}
