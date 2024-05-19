<?php

namespace Database\Seeders;

use App\Models\Socials;
use Illuminate\Database\Seeder;

class SocialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Socials::insert([
            [
                "social_id" => "facebook",
                "value" => "https://www.facebook.com/Christoplugod/",
                "user_id" => 1
            ],
            [
                "social_id" => "instagram",
                "value" => "@_christopz",
                "user_id" => 1
            ],
            [
                "social_id" => "youtube",
                "value" => "https://www.youtube.com/watch?v=DObTBxtCgr8",
                "user_id" => 1
            ]
        ]);
    }
}
