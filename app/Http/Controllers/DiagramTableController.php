<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DiagramTable;
use App\Models\Project;

class DiagramTableController extends Controller
{

    public function index(Request $request, int $projectId)
    {
        $tables = DiagramTable::where('project_id', $projectId)->get();

        return inertia('workspace/workspace', [
            'projectId' => $projectId,
            'tables' => $tables,
        ]); 
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position_x' => ['required', 'numeric'],
            'position_y' => ['required', 'numeric'],
        ]);

        $table = $project->diagramTables()->create($validated);

        return response()->json($table, 201);
    }

    public function update(Request $request, DiagramTable $diagramTable)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position_x' => ['required', 'numeric'],
            'position_y' => ['required', 'numeric'],
        ]);

        $diagramTable->update($validated);

        return response()->json($diagramTable->fresh());
    }

    public function destroy(DiagramTable $diagramTable)
    {
        $diagramTable->delete();

        return response()->noContent();
    }
}
