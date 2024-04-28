<?php

namespace App\Providers;

use App\Interfaces\ServiceInterfaces\PlanServiceInterface;
use App\Interfaces\ServiceInterfaces\testServiceInterface;
use App\Services\PlanService;
use App\Services\testService;
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
        // 'Image' => Intervention\Image\Facades\Image::class

        $this->app->bind(SecretKeyServiceInterface::class, SecretKeyService::class);
        $this->app->bind(PlanServiceInterface::class, PlanService::class);
        $this->app->bind(BillingServiceInterface::class, BillingService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
