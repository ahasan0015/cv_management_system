<?php
namespace App\Repositories;

use App\Models\User;

interface UserRepositoryInterface
{
    public function findByEmailWithRole(string $email): ?User;
    public function create(array $data): User;
    
    // Admin Management Methods
    public function getAllUsers();
    public function updateRole(User $user, int $roleId);
    public function updateStatus(User $user, string $status);
    public function deleteUser(User $user);
    public function getAllRoles();
}