<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterfaces\PlanRepositoryInterface;
use App\Models\Plan;

class PlanRepository extends BaseRepository implements PlanRepositoryInterface
{
  protected $model;

  public function __construct(Plan $model)
  {
    $this->model = $model;
  }
}
