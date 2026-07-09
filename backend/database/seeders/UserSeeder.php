<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);

        // ৩টি Recruiter (role_id = 2)
        for ($i = 1; $i <= 3; $i++) {
            DB::table('users')->insert([
                'name' => 'Recruiter ' . $i,
                'email' => 'recruiter' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
            ]);
        }

        // ১০টি Candidate (role_id = 3)
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                'name' => 'Candidate ' . $i,
                'email' => 'candidate' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
            ]);
        }
    }
}
