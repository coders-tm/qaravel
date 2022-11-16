<?php

namespace App\Providers;

use App\Models\Core\Permission;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class PermissionsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        try {
            Permission::get()->map(function ($permission) {
                Gate::define($permission->scope, function ($user) use ($permission) {
                    return $user->hasPermission($permission->scope);
                });
            });
        } catch (\Exception $e) {
            report($e);
            return false;
        }

        //Blade directives
        Blade::directive('group', function ($group, $guard = 'users') {
            return "if(current_user()->guard == {$guard} && current_user()->hasGroup({$group})) :"; //return this if statement inside php tag
        });

        Blade::directive('endgroup', function ($group) {
            return "endif;"; //return this endif statement inside php tag
        });
    }
}
