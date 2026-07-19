<?php

namespace Database\Seeders;

use App\Models\Position;
use App\Models\Attribute;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        // database gell all attribute
        $attributes = Attribute::all();

        // position
        $p1 = Position::create([
            'title' => 'Senior Frontend Developer',
            'description' => 'We are looking for a React expert with deep knowledge in TypeScript.',
            'max_project_count' => 3,
            'start_date' => now(), // today date
            'end_date' => now()->addMonths(6), 
            'settings' => ['remote' => true, 'work_type' => 'Full-time'],
        ]);

        // Randomly Attribute attach 
        if ($attributes->count() > 0) {
            $p1->attributes()->attach($attributes->random(min(2, $attributes->count()))->pluck('id'));
        }

        // position Backend Engineer
        $p2 = Position::create([
            'title' => 'Backend Engineer (Laravel)',
            'description' => 'Looking for a professional to manage our API infrastructure.',
            'max_project_count' => 5,
            'start_date' => now(),
            'end_date' => now()->addMonths(3),
            'settings' => ['remote' => false, 'location' => 'Dhaka'],
        ]);

        if ($attributes->count() > 0) {
            $p2->attributes()->attach($attributes->random(min(2, $attributes->count()))->pluck('id'));
        }
    }
}