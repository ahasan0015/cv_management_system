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

        for ($i = 1; $i <= 20; $i++) {

            $position = Position::create([
                'title' => fake()->jobTitle(),
                'description' => fake()->paragraph(3),
                'max_project_count' => fake()->numberBetween(1, 10),
                'start_date' => fake()->dateTimeBetween('-1 month', '+1 month'),
                'end_date' => fake()->dateTimeBetween('+2 months', '+12 months'),
                'access_rules' => [
                    'min_experience' => fake()->numberBetween(0, 10),
                    'roles' => fake()->randomElements([
                        'Frontend Dev',
                        'Backend Dev',
                        'Full Stack Dev',
                        'QA Engineer',
                        'DevOps Engineer',
                    ], fake()->numberBetween(1, 3)),
                ],
                'project_tags' => fake()->randomElements([
                    'Laravel',
                    'React',
                    'Vue',
                    'Angular',
                    'Node.js',
                    'PHP',
                    'TypeScript',
                    'JavaScript',
                    'Tailwind',
                    'Bootstrap',
                    'MySQL',
                    'PostgreSQL',
                    'REST API',
                    'GraphQL',
                    'Docker',
                ], fake()->numberBetween(2, 5)),
            ]);

            // Attach 1-5 random attributes
            if ($attributes->count() > 0) {
                $position->attributeList()->attach(
                    $attributes
                        ->random(min(fake()->numberBetween(1, 5), $attributes->count()))
                        ->pluck('id')
                        ->toArray()
                );
            }
        }
    }
}