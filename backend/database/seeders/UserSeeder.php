<?php

namespace Database\Seeders;

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
        User::create([
            "firstname" => "Christopher",
            "lastname" => "Lugod",
            "email" => "christianlugod05@gmail.com",
            "password" => \Hash::make("123456789dev"),
            "username" => "topzdev"
        ]);
    }
}
