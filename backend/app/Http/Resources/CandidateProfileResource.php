<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
    
        $data = is_array($this->resource) ? $this->resource : $this->resource->toArray();

        return [
            'id'           => $data['id'] ?? null,
            'user_id'      => $data['user_id'] ?? null,
            'name'         => $data['name'] ?? null,
            'email'        => $data['email'] ?? null,
            'cv_path'      => $data['cv_path'] ?? null,
            'is_published' => $data['is_published'] ?? false,
            'projects'     => $data['projects'] ?? [],
            'info'         => collect($data)->except(['id', 'user_id', 'name', 'email', 'cv_path', 'is_published', 'projects'])->all(),
        ];
    }
}