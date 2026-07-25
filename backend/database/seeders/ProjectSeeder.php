<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\CandidateProfile;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $candidates = CandidateProfile::all();

        if ($candidates->isEmpty()) {
            $this->command->warn('No candidates found! Please run CandidateProfileSeeder first.');
            return;
        }

        $projectNames = [
            'E-commerce Management System',
            'Inventory & POS Dashboard',
            'Hospital Management API',
            'Real-time Chat Application',
            'Learning Management System',
            'Task Management Tool',
            'Blog and CMS Platform',
            'CV & Resume Builder App'
        ];

        $tagsList = ['Laravel', 'React', 'Docker', 'AWS', 'PostgreSQL', 'Tailwind', 'Redis', 'Vue.js', 'Node.js'];

        foreach ($candidates as $index => $candidate) {
            $projectCount = ($index % 2) + 2; 

            for ($i = 0; $i < $projectCount; $i++) {
                $nameIndex = ($index + $i) % count($projectNames);

                Project::create([
                    'candidate_profile_id' => $candidate->id,
                    'name' => $projectNames[$nameIndex] . ' (' . ($i + 1) . ')',
                    'date_start' => now()->subYears(2)->subMonths($i),
                    'date_end' => now()->subYear()->addMonths($i),
                    'markdown_description' => 'This is a comprehensive full-stack project built with modern technologies, featuring robust backend architecture and responsive user interface.',
                    'tags' => [
                        $tagsList[$i % count($tagsList)],
                        $tagsList[($i + 2) % count($tagsList)],
                        'REST API'
                    ],
                ]);
            }
        }
    }
}