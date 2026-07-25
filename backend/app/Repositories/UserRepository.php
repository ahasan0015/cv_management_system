<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Role; 
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function findByEmailWithRole(string $email): ?User
    {
        return User::with('role')->where('email', $email)->first();
    }

    public function create(array $data): User
    {
        $candidateRole = Role::where('name', 'candidate')->first();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $candidateRole ? $candidateRole->id : null, 
            'status' => 'Active',
        ]);

        if (method_exists($user, 'candidateProfile')) {
            $user->candidateProfile()->create([
                'first_name' => $data['name'],
                'email' => $data['email'],
            ]);
        }

        return $user->load('role');
    }

    // --- Admin Management Methods ---

    public function getAllUsers()
    {
        return User::with('role')->latest()->get();
    }

    public function updateRole(User $user, int $roleId)
    {
        $user->role_id = $roleId;
        $user->save();
        return $user->load('role');
    }

    public function updateStatus(User $user, string $status)
    {
        $user->status = $status;
        $user->save();
        return $user->load('role');
    }

    public function deleteUser(User $user)
    {
        return $user->delete();
    }

    public function getAllRoles()
    {
        return Role::all();
    }
}