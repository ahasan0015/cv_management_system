<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'status' => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        //  Recruiter (role_id = 2)
        for ($i = 1; $i <= 3; $i++) {
            DB::table('users')->insert([
                'name' => 'Recruiter ' . $i,
                'email' => 'recruiter' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 10 Candidate (role_id = 3)
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                'name' => 'Candidate ' . $i,
                'email' => 'candidate' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}