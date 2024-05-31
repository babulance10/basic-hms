<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;
use App\Models\Menu;

class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Inertia::share([
            'menus' => function () {
                return Menu::with('children')
                           ->where('status', true)
                           ->whereNull('parent_id')
                           ->orderBy('order')
                           ->get();
            },
        ]);
    }
}
