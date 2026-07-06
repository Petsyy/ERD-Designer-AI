<?php

namespace App\Http\Controllers;

use App\Models\DiagramColumn;
use App\Models\DiagramTable;
use Illuminate\Http\Request;

class DiagramColumnController extends Controller
{
    public function store(Request $request, DiagramTable $diagramTable)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'data_type' => ['required', 'string', 'max:100'],

            'length' => ['nullable', 'integer'],
            'scale' => ['nullable', 'integer'],

            'is_primary' => ['boolean'],
            'is_foreign' => ['boolean'],
            'is_nullable' => ['boolean'],
            'is_unique' => ['boolean'],
            'is_unsigned' => ['boolean'],
            'is_auto_increment' => ['boolean'],

            'default_value' => ['nullable', 'string'],
            'comment' => ['nullable', 'string'],
        ]);

        $column = $diagramTable
            ->diagramColumns()
            ->create($validated);

        return response()->json($column, 201);
    }

    public function update(Request $request, DiagramColumn $diagramColumn)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'data_type' => ['required', 'string', 'max:100'],

            'length' => ['nullable', 'integer'],
            'scale' => ['nullable', 'integer'],

            'is_primary' => ['boolean'],
            'is_foreign' => ['boolean'],
            'is_nullable' => ['boolean'],
            'is_unique' => ['boolean'],
            'is_unsigned' => ['boolean'],
            'is_auto_increment' => ['boolean'],

            'default_value' => ['nullable', 'string'],
            'comment' => ['nullable', 'string'],
        ]);

        $diagramColumn->update($validated);

        return response()->json($diagramColumn->fresh());
    }

    public function destroy(DiagramColumn $diagramColumn)
    {
        $diagramColumn->delete();

        return response()->noContent();
    }
}