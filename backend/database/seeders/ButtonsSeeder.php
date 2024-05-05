<?php

namespace Database\Seeders;

use App\Models\Buttons;
use Illuminate\Database\Seeder;

class ButtonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(resource_path('/data/buttons.json'));
        $data = json_decode($file, true);
        Buttons::insert($data);
    }
}
