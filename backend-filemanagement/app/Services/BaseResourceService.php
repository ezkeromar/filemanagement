<?php

namespace App\Services;

use App\Exceptions\ServiceLayerExceptions\BaseResourceServiceException;
use App\Interfaces\BaseRepositoryInterface;
use App\Interfaces\BaseResourceServiceInterface;
use Illuminate\Support\Str;

class BaseResourceService implements BaseResourceServiceInterface
{
    protected $repository;

    protected FileUploadService $fileUpload;

    protected string $mediaName;

    protected string $storageDerictory;

    public function __construct(BaseRepositoryInterface $repository, FileUploadService $fileUpload)
    {
        $this->repository = $repository;
        $this->fileUpload = $fileUpload;
    }

    public function index(array $data = [], int $paginate = 10,array $where = [] ,  array $with = [], array $withCount = [])
    {
        try {
            return $this->repository->filter($data, $paginate, $where, $with, $withCount);
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching all records: ' . $e->getMessage());
            throw $e;

        }
    }

    public function get(array $select = ['*'], array $where = [], array $with = [], array $withCount = [])
    {
        try {
            return $this->repository->get($select, $where, $with, $withCount);
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching records: ' . $e->getMessage());
            throw $e;
        }
    }
    public function first(array $where = [], array $with = [])
    {
        try {
            return $this->repository->first($where, $with);
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching records: ' . $e->getMessage());
            throw $e;
        }
    }

    public function store(array $data)
    {
        try {
            if (isset($this->mediaName)) {
                $mediaName = $this->mediaName;
                $data[$mediaName] =
                  $this->fileUpload->interventionUploadFile(
                      $data[$mediaName],
                      $this->storageDerictory,
                      Str::slug($data['name']),
                  );
            }

            return $this->repository->create($data);
        } catch (\Exception $e) {
            \Log::error('Error occurred while storing records: ' . $e->getMessage());
            throw $e;
        }
    }

    public function show(int $id)
    {
        try {
            return $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching record: ' . $e->getMessage());
            throw $e;
        }
    }

    public function edit(int $id)
    {
        try {
            return $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching record: ' . $e->getMessage());
            throw $e;
        }
    }

    public function update(int $id, array $data)
    {
        try {
            if (isset($this->mediaName)) {
                $mediaName = $this->mediaName;
                $recorde = $this->repository->findOrFail($id);

                if (isset($data[$mediaName])) {
                    $data[$mediaName] =
                      $this->fileUpload->interventionUpdateFile(
                          $recorde->{$mediaName} ?: '',
                          $data[$mediaName],
                          $this->storageDerictory,
                          Str::slug($data['name'])
                      );
                }
            }

            return $this->repository->update($id, $data);
        } catch (\Exception $e) {
            \Log::error('Error occurred while updating record: ' . $e->getMessage());
            throw $e;
        }
    }

    public function destroy(int $id)
    {
        try {
            if (isset($this->mediaName)) {
                $mediaName = $this->mediaName;
                $productCategory = $this->repository->findOrFail($id);

                if (isset($productCategory->{$mediaName})) {
                    $this->fileUpload->deleteFile($this->storageDerictory.$productCategory->{$mediaName});
                }
            }

            return $this->repository->delete($id);
        } catch (\Exception $e) {
            \Log::error('Error occurred while deleting record: ' . $e->getMessage());
            throw $e;
        }
    }
}
