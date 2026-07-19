<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\CandidateProfile;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        
        // get all candidate
        $candidates = CandidateProfile::all();

        // if no candidate get warning
        if ($candidates->isEmpty()) {
            $this->command->warn('No candidates found! Please run CandidateProfileSeeder first.');
            return;
        }

        foreach ($candidates as $candidate) {
            // each candidate 2/3 project
            $projectCount = rand(2, 3);

            for ($i = 0; $i < $projectCount; $i++) {
                Project::create([
                    'candidate_profile_id' => $candidate->id,
                    'name' => $faker->company . ' ' . $faker->randomElement(['Management System', 'E-commerce App', 'API Engine', 'Dashboard']),
                    'date_start' => $faker->dateTimeBetween('-2 years', '-1 year'),
                    'date_end' => $faker->dateTimeBetween('-1 year', 'now'),
                    'markdown_description' => $faker->paragraphs(3, true),
                    'tags' => $faker->randomElements(['Laravel', 'React', 'Docker', 'AWS', 'PostgreSQL', 'Tailwind', 'Redis'], 3),
                ]);
            }
        }
    }
}