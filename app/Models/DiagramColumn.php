<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiagramColumn extends Model
{
    protected $fillable = [
        'table_id',
        'name',
        'data_type',
        'length',
        'scale',
        'is_primary',
        'is_foreign',
        'is_nullable',
        'is_unique',
        'is_unsigned',
        'is_auto_increment',
        'default_value',
        'comment',
        'sort_order'
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_foreign' => 'boolean',
        'is_nullable' => 'boolean',
        'is_unique' => 'boolean',
        'is_unsigned' => 'boolean',
        'is_auto_increment' => 'boolean',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function table()
    {
        return $this->belongsTo(DiagramTable::class);
    }

}
