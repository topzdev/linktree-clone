<?php

namespace Database\Seeders;

use App\Models\Fonts;
use Illuminate\Database\Seeder;

class FontsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(resource_path('/data/fonts.json'));
        $data = json_decode($file, true);
        Fonts::insert($data);
    }
}
