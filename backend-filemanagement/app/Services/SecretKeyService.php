<?php

namespace App\Services;

use App\Interfaces\RepositoryInterfaces\SecretKeyRepositoryInterface;
use App\Interfaces\ServiceInterfaces\SecretKeyServiceInterface;

class SecretKeyService extends BaseResourceService implements SecretKeyServiceInterface
{
  protected $repository;

  public function __construct(SecretKeyRepositoryInterface $repository)
  {
    $this->repository = $repository;
  }
}
