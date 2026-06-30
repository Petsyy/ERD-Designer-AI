<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'canvas_x',
        'canvas_y',
        'zoom',
    ];

    protected $casts = [
        'canvas_x' => 'float',
        'canvas_y' => 'float',
        'zoom' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
