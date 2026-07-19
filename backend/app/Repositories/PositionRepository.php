<?php

namespace App\Repositories;

use App\Models\Position;
use Illuminate\Support\Facades\DB;

class PositionRepository
{
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $position = Position::create($data);
            if (!empty($data['attributes'])) {
                $position->attributeList()->sync($data['attributes']);
            }
            return $position;
        });
    }

    public function update($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $position = Position::findOrFail($id);
            $position->update($data);
            
            if (isset($data['attributes'])) {
                $position->attributeList()->sync($data['attributes']);
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