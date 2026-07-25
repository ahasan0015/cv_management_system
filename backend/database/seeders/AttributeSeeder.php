<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttributeSeeder extends Seeder
{
    public function run(): void
    {
        
        //  1=Personal, 2=Education, 3=Experience, 4=Skills, 5=Portfolio
        // type id 1=string, 2=markdown, 3=image, 4=number, 5=date
        
        DB::table('attributes')->insert([
            ['name' => 'Full Name', 'category_id' => 1, 'attribute_type_id' => 1, 'version' => 1],
            ['name' => 'Bio', 'category_id' => 1, 'attribute_type_id' => 2, 'version' => 1],
            ['name' => 'Profile Picture', 'category_id' => 1, 'attribute_type_id' => 3, 'version' => 1],
            ['name' => 'Degree Name', 'category_id' => 2, 'attribute_type_id' => 1, 'version' => 1],
            ['name' => 'Graduation Year', 'category_id' => 2, 'attribute_type_id' => 4, 'version' => 1],
            ['name' => 'Job Title', 'category_id' => 3, 'attribute_type_id' => 1, 'version' => 1],
        ]);
    }
}