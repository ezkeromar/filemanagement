<?php

namespace App\Providers;

use App\Interfaces\RepositoryInterfaces\PlanRepositoryInterface;
use App\Interfaces\RepositoryInterfaces\SecretKeyRepositoryInterface;
use App\Repositories\PlanRepository;
use App\Repositories\SecretKeyRepository;
use App\Interfaces\RepositoryInterfaces\BillingRepositoryInterface;
use App\Repositories\BillingRepository;
use Illuminate\Support\ServiceProvider;


class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
      $this->app->bind(SecretKeyRepositoryInterface::class, SecretKeyRepository::class);
      $this->app->bind(PlanRepositoryInterface::class, PlanRepository::class);
      $this->app->bind(BillingRepositoryInterface::class, BillingRepository::class);
        
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
