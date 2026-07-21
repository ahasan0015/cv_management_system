<?php

namespace App\Repositories;

use App\Models\Position;
use Illuminate\Support\Facades\DB;

class PositionRepository
{
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            // attributes 
            $attributes = $data['attributes'] ?? [];
            unset($data['attributes']);

            // positions table data save
            $position = Position::create($data);

            // pivot table sttribute sync
            if (!empty($attributes)) {
                $position->attributeList()->sync($attributes);
            }

            return $position;
        });
    }

    public function update($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $position = Position::findOrFail($id);

            // attributes 
            $attributes = $data['attributes'] ?? [];
            unset($data['attributes']);

            // positions 
            $position->update($data);
            
            if (isset($data['attributes']) || !empty($attributes)) {
                $position->attributeList()->sync($attributes);
            }

            return $position;
        });
    }

    public function delete($id)
    {
        return DB::transaction(function () use ($id) {
            $position = Position::findOrFail($id);
            $position->attributeList()->detach();
            return $position->delete();
        });
    }

    public function duplicate($id)
    {
        return DB::transaction(function () use ($id) {
            $original = Position::with('attributeList')->findOrFail($id);
            
            $duplicate = $original->replicate();
            $duplicate->title = $original->title . ' (Copy)';
            $duplicate->save();

            $duplicate->attributeList()->attach($original->attributeList->pluck('id'));
            
            return $duplicate;
        });
    }
}