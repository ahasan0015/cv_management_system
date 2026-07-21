<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PositionResource;
use App\Models\Position;
use App\Repositories\PositionRepository;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    protected $repository;

    public function __construct(PositionRepository $repository)
    {
        $this->repository = $repository;
    }

    // GET: /api/positions
    public function index()
    {
        $positions = Position::with('attributeList')->latest()->paginate(10);
        return PositionResource::collection($positions);
    }

    // POST: /api/positions
  public function store(Request $request)
{
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'max_project_count' => 'required|integer',
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
        'attributes' => 'nullable|array',
        'attributes.*' => 'exists:attributes,id',
        'access_rules' => 'nullable', 
        'project_tags' => 'nullable', 
    ]);

    if (isset($data['project_tags']) && is_string($data['project_tags'])) {
        $data['project_tags'] = array_map('trim', explode(',', $data['project_tags']));
    }

    // access_rules 
    if (isset($data['access_rules']) && is_string($data['access_rules'])) {
        $decoded = json_decode($data['access_rules'], true);
        $data['access_rules'] = json_last_error() === JSON_ERROR_NONE ? $decoded : ['rule' => $data['access_rules']];
    }

    // attributes 
    $attributes = $data['attributes'] ?? [];
    unset($data['attributes']); 

    // Create Position
    $position = $this->repository->create($data);

    // Attribute save / sync
    if (!empty($attributes)) {
        $position->attributeList()->sync($attributes);
    }

    return new PositionResource($position->load('attributeList'));
}

    // GET: /api/positions/{id}
    public function show($id)
    {
        $position = Position::with('attributeList')->findOrFail($id);
        return new PositionResource($position);
    }

    // PUT/PATCH: /api/positions/{id}
    public function update(Request $request, $id)
{
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'max_project_count' => 'required|integer',
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
        'attributes' => 'nullable|array',
        'attributes.*' => 'exists:attributes,id',
        'access_rules' => 'nullable',
        'project_tags' => 'nullable',
    ]);

    // project_tags
    if (isset($data['project_tags']) && is_string($data['project_tags'])) {
        $data['project_tags'] = array_map('trim', explode(',', $data['project_tags']));
    }

    // access_rules
    if (isset($data['access_rules']) && is_string($data['access_rules'])) {
        $decoded = json_decode($data['access_rules'], true);
        $data['access_rules'] = json_last_error() === JSON_ERROR_NONE
            ? $decoded
            : ['rule' => $data['access_rules']];
    }

    $attributes = $data['attributes'] ?? [];
    unset($data['attributes']);

    $position = $this->repository->update($id, $data);

    if (!$position instanceof Position) {
        $position = Position::findOrFail($id);
    }

    $position->attributeList()->sync($attributes);

    return new PositionResource($position->load('attributeList'));
}
    // DELETE: /api/positions/{id}
    public function destroy($id)
    {
        $this->repository->delete($id);
        return response()->json(['message' => 'Position deleted successfully'], 200);
    }

    // POST: /api/positions/{id}/duplicate
    public function duplicate($id)
    {
        $duplicate = $this->repository->duplicate($id);
        return new PositionResource($duplicate->load('attributeList'));
    }
}