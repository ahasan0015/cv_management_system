<?php

namespace App\Repositories;

interface ProfileRepositoryInterface
{
    public function getProfile($user);

    public function updateProfile($user, array $data);
}