<?php

namespace Database\Seeders;

use App\Models\Links;
use Illuminate\Database\Seeder;

class LinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Links::factory()->count(10)->create();
    }
}
