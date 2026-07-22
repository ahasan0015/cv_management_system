<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    // All Project List
    public function index(Request $request)
    {
        $projects = $this->projectRepository->getAllForUser($request->user());
        return ProjectResource::collection($projects);
    }

    // To store project
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'markdown_description' => 'required|string',
            'tags' => 'nullable|array',
        ]);

        $project = $this->projectRepository->createForUser($request->user(), $validated);

        return (new ProjectResource($project))
            ->additional(['message' => 'Project created successfully'])
            ->response()
            ->setStatusCode(201);
    }

    // Show single project
    public function show(Request $request, $id)
    {
        $project = $this->projectRepository->findForUser($request->user(), $id);

        if (!$project) {
            return response()->json(['message' => 'Project not found!'], 404);
        }

        return new ProjectResource($project);
    }

    // Update project
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'markdown_description' => 'sometimes|required|string',
            'tags' => 'nullable|array',
        ]);

        $project = $this->projectRepository->updateForUser($request->user(), $id, $validated);

        if (!$project) {
            return response()->json(['message' => 'Project not found!'], 404);
        }

        return (new ProjectResource($project))
            ->additional(['message' => 'Project updated successfully']);
    }

    // Delete project
    public function destroy(Request $request, $id)
    {
        $deleted = $this->projectRepository->deleteForUser($request->user(), $id);

        if (!$deleted) {
            return response()->json(['message' => 'Project not found!'], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}