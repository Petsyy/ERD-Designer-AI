<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Models\DiagramTable;
use App\Models\Project;

class DiagramTableController extends Controller
{
    use AuthorizesRequests;

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
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:50'],
            'icon' => ['nullable', 'string', 'max:50'],
            'note' => ['nullable', 'string'],
            'position_x' => ['nullable', 'numeric'],
            'position_y' => ['nullable', 'numeric'],
        ]);

        $validated['position_x'] = $validated['position_x'] ?? rand(150, 450);
        $validated['position_y'] = $validated['position_y'] ?? rand(150, 350);
        $validated['color'] = $validated['color'] ?? '#18181b';

        $table = $project->diagramTables()->create($validated);

        if ($request->header('X-Inertia') || !$request->wantsJson()) {
            return redirect()->back()->with('success', 'Table created successfully!');
        }

        return response()->json($table, 201);
    }

    public function update(Request $request, DiagramTable $diagramTable)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:50'],
            'icon' => ['nullable', 'string', 'max:50'],
            'note' => ['nullable', 'string'],
            'position_x' => ['sometimes', 'required', 'numeric'],
            'position_y' => ['sometimes', 'required', 'numeric'],
        ]);

        $diagramTable->update($validated);

        if ($request->header('X-Inertia') || !$request->wantsJson()) {
            return redirect()->back()->with('success', 'Table updated successfully!');
        }

        return response()->json($diagramTable->fresh());
    }

    public function destroy(Request $request, DiagramTable $diagramTable)
    {
        $diagramTable->delete();

        if ($request->header('X-Inertia') || !$request->wantsJson()) {
            return redirect()->back()->with('success', 'Table deleted successfully!');
        }

        return response()->noContent();
    }
}
