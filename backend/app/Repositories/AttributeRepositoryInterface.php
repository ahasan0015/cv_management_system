<?php

namespace App\Repositories;

interface AttributeRepositoryInterface {
    public function getAll();
    public function updateWithLock(int $id, array $data, int $version);
}