<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class GuardMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        if (in_array(guard(), $guards)) {
            return $next($request);
        }

        return response()->json('Unauthenticated.', 401);
    }
}
