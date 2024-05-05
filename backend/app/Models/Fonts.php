<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fonts extends Model
{
    use HasFactory;

    const GROUP = [
        1 => "Classic",
        2 => "Modern",
        3 => "Unique"
    ];

    protected $fillable = [
        'key',
        'title',
        'group',
        'font_size',
        'font_weight',
        'letter_spacing',
    ];
}
