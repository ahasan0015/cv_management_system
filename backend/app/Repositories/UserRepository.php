<?php
namespace App\Repositories;

use App\Models\User;
use App\Models\Role; 
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function findByEmailWithRole(string $email): ?User
    {
        return User::with('role')->where('email', $email)->first();
    }

    public function create(array $data): User
    {
        // 'candidate' 
        $candidateRole = Role::where('name', 'candidate')->first();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $candidateRole ? $candidateRole->id : null, 
        ]);

        //candidate initial profile
        if (method_exists($user, 'candidateProfile')) {
            $user->candidateProfile()->create([
                'first_name' => $data['name'],
                'email' => $data['email'],
            ]);
        }

        return $user->load('role');
    }
}