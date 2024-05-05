<?php

namespace Database\Seeders;

use App\Models\Backgrounds;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BackgroundsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(resource_path('/data/backgrounds.json'));
        $data = json_decode($file, true);
        Backgrounds::insert($data);
    }
}
