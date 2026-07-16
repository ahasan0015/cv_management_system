<?php

namespace App\Repositories;

interface AttributeRepositoryInterface {
    public function getAll(array $filters = [], int $perPage = 10);
    public function updateWithLock(int $id, array $data, int $version);
}