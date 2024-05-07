<?php

namespace Database\Seeders;

use App\Models\Themes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThemesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(resource_path('/data/themes.json'));
        $data = json_decode($file, true);
        Themes::insert($data);
    }
}
