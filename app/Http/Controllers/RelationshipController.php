<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Relationship;

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
        ]);

        $relationship = $project->relationships()->create($validated);

        return response()->json($relationship, 201);
    }

    public function update(Request $request, Project $project, Relationship $relationship)
    {
        $validated = $request->validated([
            'relationship_type' => ['required', 'in:one_to_one,one_to_many,many_to_one,many_to_many'],
        ]);

        $relationship->update($validated);

        return response()->json($relationship);
    }

    public function destroy(Request $request, Project $project, Relationship $relationship)
    {
        $relationship->delete();

        return response()->noContent();
    }
}
