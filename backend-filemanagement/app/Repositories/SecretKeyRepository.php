<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterfaces\SecretKeyRepositoryInterface;
use App\Models\SecretKey;

class SecretKeyRepository extends BaseRepository implements SecretKeyRepositoryInterface
{
  protected $model;

  public function __construct(SecretKey $model)
  {
    $this->model = $model;
  }
}
