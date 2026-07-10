<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\RelationshipType;

class Relationship extends Model
{
    protected $fillable = [
        'project_id',
        'source_table_id',
        'source_column_id',
        'target_table_id',
        'target_column_id',
        'relationship_type',
        'on_delete',
        'on_update',
    ];

    protected $casts = [
        'source_table_id' => 'integer',
        'source_column_id' => 'integer',
        'target_table_id' => 'integer',
        'target_column_id' => 'integer',
        'relationship_type' => RelationshipType::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function sourceTable()
    {
        return $this->belongsTo(DiagramTable::class, 'source_table_id');
    }

    public function targetTable()
    {
        return $this->belongsTo(DiagramTable::class, 'target_table_id');
    }
    
    public function targetColumn()
    {
        return $this->belongsTo(DiagramColumn::class, 'target_column_id');
    }

    public function sourceColumn()
    {
        return $this->belongsTo(DiagramColumn::class, 'source_column_id');
    }

}
