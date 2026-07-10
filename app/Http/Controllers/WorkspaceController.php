<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    use AuthorizesRequests;

    public function page(Request $request, Project $project)
    {
        $this->authorize('view', $project);

        $project->update(['last_opened_at' => now()]);

        return inertia('workspace/workspace', [
            'project' => $project->load([
                'diagramTables.diagramColumns',
                'relationships.sourceTable',
                'relationships.targetTable',
                'relationships.sourceColumn',
                'relationships.targetColumn'
            ]),
        ]);
    }
}
