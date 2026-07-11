<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttributeTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'String', 'slug' => 'string'],
            ['name' => 'Text (Markdown)', 'slug' => 'markdown'],
            ['name' => 'Image', 'slug' => 'image'],
            ['name' => 'Number', 'slug' => 'number'],
            ['name' => 'Date', 'slug' => 'date'],
            ['name' => 'Period', 'slug' => 'period'],
            ['name' => 'Boolean', 'slug' => 'boolean'],
            ['name' => 'Dropdown', 'slug' => 'dropdown'],
        ];

        DB::table('attribute_types')->insert($types);
    }
}