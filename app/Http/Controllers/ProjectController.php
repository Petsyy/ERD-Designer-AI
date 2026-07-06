<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(Request $request)
    {
        $projects = $request->user()
            ->projects()
            ->latest('last_opened_at')
            ->get();

        return inertia('dashboard/dashboard', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        $request->user()->projects()->create([
            'last_opened_at' => now(),
            'canvas_x' => 100,
            'canvas_y' => 100,
            'zoom' => 1.00,
            ...$validated
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified project.
     */
    public function show(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $project->update(['last_opened_at' => now()]);

        return inertia('workspace/workspace', [
            'project' => $project->load(['diagramTables.diagramColumns', 'relationships']),
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validated();

        $project->update($validated);

        return back()->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Request $request, Project $project)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }

        $project->delete();

        return redirect()->route('dashboard');
    }
}
