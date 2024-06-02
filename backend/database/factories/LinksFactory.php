<?php

namespace Database\Factories;

use App\Models\Links;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class LinksFactory extends Factory
{

    protected $model = Links::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence,
            'url' => fake()->url,
            'type' => fake()->numberBetween(1, 2),
            'thumbnail' => fake()->imageUrl,
            'user_id' => fake()->numberBetween(1, 1),
            'is_enabled' => true,
        ];
    }
}
