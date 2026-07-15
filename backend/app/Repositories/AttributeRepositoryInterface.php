<?php

namespace App\Repositories;

interface AttributeRepositoryInterface {
    public function getAll(array $filters = []);
    public function updateWithLock(int $id, array $data, int $version);
}