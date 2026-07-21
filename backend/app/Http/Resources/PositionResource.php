<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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
                return $this->attributeList->pluck('id'); 
            }),
            'start_date' => $this->start_date ? Carbon::parse($this->start_date)->format('Y-m-d') : null,
            'end_date' => $this->end_date ? Carbon::parse($this->end_date)->format('Y-m-d') : null,
    
        ];
    }
}