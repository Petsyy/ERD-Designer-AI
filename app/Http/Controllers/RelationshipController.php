<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Relationship;
use Illuminate\Http\Request;

class RelationshipController extends Controller
{

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'source_table_id' => ['required', 'exists:diagram_tables,id'],
            'source_column_id' => ['required', 'exists:diagram_columns,id'],
            'target_table_id' => ['required', 'exists:diagram_tables,id'],
            'target_column_id' => ['required', 'exists:diagram_columns,id'],
            'relationship_type' => ['required', 'in:one_to_one,one_to_many,many_to_one,many_to_many'],
            'on_delete' => ['nullable', 'in:CASCADE,SET NULL,RESTRICT,NO ACTION,SET DEFAULT'],
            'on_update' => ['nullable', 'in:CASCADE,SET NULL,RESTRICT,NO ACTION,SET DEFAULT'],
        ]);

        $validated['on_delete'] = $validated['on_delete'] ?? 'CASCADE';
        $validated['on_update'] = $validated['on_update'] ?? 'CASCADE';

        $relationship = $project->relationships()->create($validated);

        // Mark target column as FK when connected
        $relationship->targetColumn()->update(['is_foreign' => true]);

        return response()->json($relationship, 201);
    }

    public function update(Request $request, Project $project, Relationship $relationship)
    {
        $validated = $request->validate([
            'relationship_type' => ['sometimes', 'required', 'in:one_to_one,one_to_many,many_to_one,many_to_many'],
            'on_delete' => ['sometimes', 'nullable', 'in:CASCADE,SET NULL,RESTRICT,NO ACTION,SET DEFAULT'],
            'on_update' => ['sometimes', 'nullable', 'in:CASCADE,SET NULL,RESTRICT,NO ACTION,SET DEFAULT'],
        ]);

        $relationship->update($validated);

        return response()->json($relationship);
    }

    public function destroy(Request $request, Project $project, Relationship $relationship)
    {
        $targetColumn = $relationship->targetColumn;
        $relationship->delete();

        // Unmark FK if no other relationships target this column
        if ($targetColumn && !Relationship::where('target_column_id', $targetColumn->id)->exists()) {
            $targetColumn->update(['is_foreign' => false]);
        }

        return response()->noContent();
    }
}
