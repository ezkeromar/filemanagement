<?php

namespace App\Services;

use App\Interfaces\RepositoryInterfaces\PlanRepositoryInterface;
use App\Interfaces\ServiceInterfaces\PlanServiceInterface;

class PlanService extends BaseResourceService implements PlanServiceInterface
{
  protected $repository;

  public function __construct(PlanRepositoryInterface $repository)
  {
    $this->repository = $repository;
  }
}
