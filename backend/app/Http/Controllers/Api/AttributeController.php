<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\AttributeRepositoryInterface;
use App\Http\Resources\AttributeResource; // পরবর্তী ধাপে এটি তৈরি করব

class AttributeController extends Controller
{
    protected $repo;

    // Repo inject
    public function __construct(AttributeRepositoryInterface $repo) {
        $this->repo = $repo;
    }

    public function index() {
        // Eager loading
        $attributes = $this->repo->getAll();
        
        // Resource 
        return AttributeResource::collection($attributes);
    }
}