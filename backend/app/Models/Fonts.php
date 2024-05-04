<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fonts extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'title',
        'group',
        'font_size',
        'font_weight',
        'letter_spacing',
    ];
}
