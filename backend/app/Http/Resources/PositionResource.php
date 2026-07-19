<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
   public function toArray($request): array
{
    return [
        'id' => $this->id,
        'title' => $this->title,
        'description' => $this->description,
        'max_project_count' => $this->max_project_count,
        'access_rules' => $this->access_rules,
        'project_tags' => $this->project_tags,
        'attributes' => $this->whenLoaded('attributeList', function () {
            return $this->attributeList->pluck('name');
        }),
    ];
}
}