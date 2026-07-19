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
            'title' => 'required|string',
            'max_project_count' => 'required|integer',
            'attributes' => 'nullable|array'
        ]);

        $position = $this->repository->create($data);
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
            'title' => 'required|string',
            'max_project_count' => 'required|integer',
            'attributes' => 'nullable|array'
        ]);

        $position = $this->repository->update($id, $data);
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