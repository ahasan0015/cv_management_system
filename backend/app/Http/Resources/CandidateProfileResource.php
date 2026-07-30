<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = is_array($this->resource) ? $this->resource : $this->resource->toArray();

        return [
            'id'           => $data['id'] ?? null,
            'user_id'      => $data['user_id'] ?? null,
            'name'         => $data['name'] ?? null,
            'email'        => $data['email'] ?? null,
            'avatar'       => $data['avatar'] ?? null,
            'cv_path'      => $data['cv_path'] ?? null,
            'is_published' => $data['is_published'] ?? false,
            'permissions'  => $data['permissions'] ?? ['can_edit' => true, 'can_view' => true], 
            'projects'     => $data['projects'] ?? [],
            'attributes'   => $data['attributes'] ?? ($data['info'] ?? []),
            'available_attributes' => $data['available_attributes'] ?? [],
        ];
    }
}