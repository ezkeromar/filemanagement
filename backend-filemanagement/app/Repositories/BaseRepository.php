<?php

namespace App\Repositories;

use App\Interfaces\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface
{

    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        try {
            return $this->model->all();
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching all records: ' . $e->getMessage());

            throw $e;
        }
    }

    public function get(array $select = ['*'], array $where = [], array $with = [], array $withCount = [])
    {
        try {
            return $this->model->withCount($withCount)->with($with)->where($where)->get($select);
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching records: ' . $e->getMessage());

            throw $e;
        }
    }
    // first
    public function first(array $where = [], array $with = [])
    {
        try {
            return $this->model->with($with)->where($where)->first();
        } catch (\Exception $e) {
            \Log::error('Error occurred while fetching records: ' . $e->getMessage());

            throw $e;
        }
    }

    public function paginate(int $paginate = 10, array $with = [], array $withCount = [])
    {
        try {
            return $this->model->withCount($withCount)->with($with)->paginate($paginate);
        } catch (\Exception $e) {
            \Log::error('Error occurred while paginating records: ' . $e->getMessage());

            throw $e;
        }
    }

    public function filter(array $data = [], int $paginate = 10,array $where = [], array $with = [], array $withCount = [])
    {
        try {
            return $this->model->withCount($withCount)
                ->with($with)
                ->where($where)
                ->when(isset($data['keyword']) && $data['keyword'] != null, function ($query) use ($data) {
                    $query->search($data['keyword']);
                })
                ->when(isset($data['status']) && $data['status'] != '', function ($query) use ($data) {
                    $query->whereStatus($data['status']);
                })
                ->orderBy($data['sort_by'] ?? 'id', $data['order_by'] ?? 'desc')
                ->paginate($data['limit_by'] ?? $paginate);
        } catch (\Exception $e) {
            \Log::error('Error occurred while filtering records: ' . $e->getMessage());

            throw $e;
        }
    }

    public function find(int $id)
    {
        try {
            return $this->model->find($id);
        } catch (\Exception $e) {
            \Log::error('Error occurred while finding record: ' . $e->getMessage());

            throw $e;
        }
    }

    public function findOrFail(int $id)
    {
        try {
            return $this->model->findOrFail($id);
        } catch (\Exception $e) {
            \Log::error('Error occurred while finding record: ' . $e->getMessage());

            throw $e;
        }
    }

    public function create(array $data)
    {
        try {
            return $this->model->create($data);
        } catch (\Exception $e) {
            \Log::error('Error occurred while creating record: ' . $e->getMessage());

            throw $e;
        }
    }

    public function update(int $id, array $data)
    {
        try {
            return $this->findOrFail($id)->update($data);
        } catch (\Exception $e) {
            \Log::error('Error occurred while updating record: ' . $e->getMessage());

            throw $e;
        }
    }

    public function delete(int $id)
    {
        try {
            return $this->findOrFail($id)->delete();
        } catch (\Exception $e) {
            \Log::error('Error occurred while deleting record: ' . $e->getMessage());

            throw $e;
        }
    }
}
