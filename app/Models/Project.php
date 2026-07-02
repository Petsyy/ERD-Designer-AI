<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'canvas_x',
        'canvas_y',
        'zoom',
        'thumbnail',
        'last_opened_at',
    ];

    protected $casts = [
        'canvas_x' => 'double',
        'canvas_y' => 'double',
        'zoom' => 'float',
        'deleted_at' => 'datetime',
        'last_opened_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function diagramTables()
    {
        return $this->hasMany(DiagramTable::class);
    }

    public function relationships()
    {
        return $this->hasMany(Relationship::class);
    }

}
