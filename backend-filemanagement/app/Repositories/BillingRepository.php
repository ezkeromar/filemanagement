<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterfaces\BillingRepositoryInterface;
use App\Models\Billing;

class BillingRepository extends BaseRepository implements BillingRepositoryInterface
{
  protected $model;

  public function __construct(Billing $model)
  {
    $this->model = $model;
  }
}
