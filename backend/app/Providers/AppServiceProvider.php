<?php

namespace App\Providers;

use App\Repositories\AttributeRepository;
use App\Repositories\AttributeRepositoryInterface;
use App\Repositories\DashboardRepository;
use App\Repositories\DashboardRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
        AttributeRepositoryInterface::class,
        AttributeRepository::class
    );

    // Dashboard Repository Binding
        $this->app->bind(
            DashboardRepositoryInterface::class,
            DashboardRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
