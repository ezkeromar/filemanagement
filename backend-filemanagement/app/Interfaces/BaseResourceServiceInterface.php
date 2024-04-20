<?php

namespace App\Interfaces;

interface BaseResourceServiceInterface
{
    public function index();

    public function get(array $select, array $where, array $with, array $withCount);
    // first
    public function first(array $where, array $with);

    public function store(array $data);

    public function show(int $id);

    public function edit(int $id);

    

    public function update(int $id, array $data);

    public function destroy(int $id);

    
}
