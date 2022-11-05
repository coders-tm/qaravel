<?php

namespace App\Providers;

use App\Services\ResourceRegistrar;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('Illuminate\Routing\ResourceRegistrar', ResourceRegistrar::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'User' => 'App\Models\User',
            'Admin' => 'App\Models\Admin',
            'Address' => 'App\Models\Core\Address',
            'Group' => 'App\Models\Core\Group',
        ]);

        Paginator::useBootstrapFive();
    }
}
