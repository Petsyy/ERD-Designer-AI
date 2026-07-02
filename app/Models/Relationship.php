<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $fillable = [
        'project_id',
        'source_table_id',
        'source_column_id',
        'target_table_id',
        'target_column_id',
        'type',
    ];

    protected $casts = [
        'source_table_id' => 'integer',
        'source_column_id' => 'integer',
        'target_table_id' => 'integer',
        'target_column_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function sourceDiagramTable()
    {
        return $this->belongsTo(DiagramTable::class, 'source_table_id');
    }

    public function targetDiagramTable()
    {
        return $this->belongsTo(DiagramTable::class, 'target_table_id');
    }
    
    public function targetDiagramColumn()
    {
        return $this->belongsTo(DiagramColumn::class, 'target_column_id');
    }

    public function sourceDiagramColumn()
    {
        return $this->belongsTo(DiagramColumn::class, 'source_column_id');
    }

}
