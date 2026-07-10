<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Policies\ProjectPolicy;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;


class ProjectController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the projects.
     */
    public function index(Request $request)
    {
        $projects = $request
            ->user()
            ->projects()
            ->latest('last_opened_at')
            ->get();

        return inertia('project/project-dashboard', [
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
        return redirect()->route('workspace', $project);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validated();

        $project->update($validated);

        return back()->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Request $request, Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return redirect()->route('dashboard');
    }
}
