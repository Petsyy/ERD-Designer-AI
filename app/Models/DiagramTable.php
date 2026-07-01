<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiagramTable extends Model
{
    protected $fillable = [
        'project_id',
        'name',
        'color',
        'position_x',
        'position_y',
    ];

    protected $casts = [
        'position_x' => 'float',
        'position_y' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
