<?php

namespace App\Services;

use App\Interfaces\RepositoryInterfaces\BillingRepositoryInterface;
use App\Interfaces\ServiceInterfaces\BillingServiceInterface;

class BillingService extends BaseResourceService implements BillingServiceInterface
{
  protected $repository;

  public function __construct(BillingRepositoryInterface $repository)
  {
    $this->repository = $repository;
  }
}
