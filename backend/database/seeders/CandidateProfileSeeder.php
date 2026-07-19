<?php

namespace Database\Seeders;

use App\Models\CandidateProfile;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CandidateProfileSeeder extends Seeder
{
    public function run(): void
    {
        // 10 candidate dummy data
        for ($i = 1; $i <= 20; $i++) {
            
            // dummy user create
            $user = User::create([
                'name' => 'Candidate ' . $i,
                'email' => 'candidate' . $i . '@exam.com',
                'password' => bcrypt('password'),
            ]);

            // candidate profile make
            $profile = CandidateProfile::create([
                'user_id' => $user->id,
                'info' => [
                    'phone' => '0171100000' . $i,
                    'address' => 'Dhaka, Bangladesh',
                    'linkedIn' => 'linkedin.com/in/candidate' . $i,
                    'bio' => 'Expert in Laravel and React development with 5 years of experience.'
                ],
                'cv_path' => 'cvs/candidate_' . $i . '.pdf',
            ]);

            // add project
            Project::create([
                'candidate_profile_id' => $profile->id,
                'name' => 'E-commerce Platform',
                'date_start' => now()->subYears(2),
                'date_end' => now()->subYear(),
                'markdown_description' => '# Project Overview\nDeveloped a full-stack e-commerce solution using Laravel.',
                'tags' => ['Laravel', 'Vue', 'Stripe']
            ]);

            Project::create([
                'candidate_profile_id' => $profile->id,
                'name' => 'Hospital Management System',
                'date_start' => now()->subMonths(6),
                'date_end' => now(),
                'markdown_description' => '# Project Overview\nAutomated patient records using React and PostgreSQL.',
                'tags' => ['React', 'PostgreSQL', 'Node.js']
            ]);
        }
    }
}