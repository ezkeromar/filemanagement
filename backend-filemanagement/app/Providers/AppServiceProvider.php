<?php

namespace App\Providers;

use App\Interfaces\ServiceInterfaces\SecretKeyServiceInterface;
use App\Services\SecretKeyService;
use App\InterfacePlanrviceInterfaces\PlanageServiceInterface;
use App\Services\PlanageService;
use App\Interfaces\ServiceInterfaces\BillingServiceInterface;
use App\Services\BillingService;
use App\Interfaces\ServiceInterfaces\MyCRUDServiceInterface;
use App\Services\MyCRUDService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
