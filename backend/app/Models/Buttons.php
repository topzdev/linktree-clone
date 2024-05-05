<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buttons extends Model
{
    use HasFactory;

    const GROUP = [
        1 => "Fill",
        2 => "Outline",
        3 => "Soft Shadow",
        4 => "Hard Shadow",
    ];
    protected $fillable = [
        'title',
        'key',
        'group_id'
    ];
}
