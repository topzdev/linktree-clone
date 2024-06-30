<?php

namespace Database\Seeders;

use App\Models\Themes;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ThemesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(resource_path('/data/themes.json'));
        $data = json_decode($file, true);

        $items = array_map(function ($item) {
            return Arr::only($item, [
                'title',
                'key',
                'preview',
                'bg_color',
                'bg_from',
                'bg_to',
                'bg_position',
                'bg_image',
                'bg_image_m',
                'bg_video',
                'btn_color',
                'btn_style',
                'btn_text_color',
                'btn_shadow_color',
                'font_color',
                'font_style',
                'bg_id',
                'bg_id',
                'backgrounds',
                'btn_id',
                'btn_id',
                'buttons',
                'font_id',
            ]);
        }, $data);
//        dd($items);
        Themes::insert($items);
    }
}
