<?php

namespace Database\Seeders;

use App\Models\Position;
use App\Models\Attribute;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $attributes = Attribute::all();

        $titles = [
            'Full Stack Web Developer',
            'Laravel & React Developer',
            'Frontend Engineer',
            'Backend Developer',
            'DevOps Specialist',
            'Vue.js Developer',
            'Node.js Engineer',
            'Software Quality Assurance',
            'UI/UX Designer',
            'Junior PHP Developer'
        ];

        $rolesList = ['Frontend Dev', 'Backend Dev', 'Full Stack Dev', 'QA Engineer', 'DevOps Engineer'];
        $tagsList = ['Laravel', 'React', 'Vue', 'Angular', 'Node.js', 'PHP', 'TypeScript', 'JavaScript', 'Tailwind', 'Bootstrap', 'MySQL', 'PostgreSQL', 'Docker'];

        for ($i = 0; $i < 20; $i++) {
            $titleIndex = $i % count($titles);

            $position = Position::create([
                'title' => $titles[$titleIndex] . ' (' . ($i + 1) . ')',
                'description' => 'This is a professional position description for the role. We are looking for a passionate developer with strong problem-solving skills and experience in modern web technologies.',
                'max_project_count' => ($i % 5) + 2,
                'start_date' => now()->subDays(($i % 10) + 1),
                'end_date' => now()->addMonths(($i % 5) + 2),
                'access_rules' => [
                    'min_experience' => ($i % 4),
                    'roles' => [$rolesList[$i % count($rolesList)], $rolesList[($i + 1) % count($rolesList)]],
                ],
                'project_tags' => [
                    $tagsList[$i % count($tagsList)],
                    $tagsList[($i + 3) % count($tagsList)],
                    $tagsList[($i + 5) % count($tagsList)]
                ],
            ]);

            // Attach random attributes
            if ($attributes->count() > 0) {
                $position->attributeList()->attach(
                    $attributes
                        ->random(min(3, $attributes->count()))
                        ->pluck('id')
                        ->toArray()
                );
            }
        }
    }
}