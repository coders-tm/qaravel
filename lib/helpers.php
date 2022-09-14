<?php

if (!function_exists('guard')) {
    function guard()
    {
        if (request()->route('guard')) {
            return request()->route('guard');
        } else if (auth()) {
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
