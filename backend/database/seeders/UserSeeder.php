<?php

namespace Database\Seeders;

use App\Models\Links;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $user = User::create([
            "firstname" => "Christopher",
            "lastname" => "Lugod",
            "email" => "christianlugod05@gmail.com",
            "password" => \Hash::make("123456789dev"),
            "username" => "topzdev"
        ]);

//        Links::factory()->count(10)->create([
//            "user_id" => $user->id
//        ]);


    }
}
