<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Personal Information', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Education', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Experience', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Skills', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Portfolio & Projects', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Certifications & Training', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Languages', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Awards & Achievements', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Publications & Research', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Extracurricular Activities', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'References', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}