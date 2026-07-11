<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\AttributeRepositoryInterface;
use App\Http\Resources\AttributeResource;

class AttributeController extends Controller
{
    protected $repo;

    // Repo inject
    public function __construct(AttributeRepositoryInterface $repo) {
        $this->repo = $repo;
    }

   public function index() {
    try {
        $attributes = $this->repo->getAll();
        return AttributeResource::collection($attributes);
    } catch (\Throwable $th) {
        // error response
        return response()->json([
            'message' => 'Error occurred',
            'error' => $th->getMessage(),
            'file' => $th->getFile(),
            'line' => $th->getLine()
        ], 500);
    }
}
}