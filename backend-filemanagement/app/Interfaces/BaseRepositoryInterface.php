<?php

namespace App\Interfaces;

interface BaseRepositoryInterface
{
    // all
    public function all();

    public function get(array $select, array $where, array $with);

    public function paginate(int $paginate, array $with, array $withCount);

    public function filter(array $data, int $paginate,array $where , array $with, array $withCount);
    // first
    public function first(array $where, array $with);

    public function find(int $id);

    public function findOrFail(int $id);

    public function create(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);
}
