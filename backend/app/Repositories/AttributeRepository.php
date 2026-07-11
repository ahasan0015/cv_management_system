<?php

namespace App\Repositories;

use App\Models\Attribute;

class AttributeRepository implements AttributeRepositoryInterface {
    
    public function getAll() {
        return Attribute::with(['category', 'attributeType'])
            ->select(['id', 'name', 'category_id', 'attribute_type_id', 'version'])
            ->get();
    }

    public function updateWithLock(int $id, array $data, int $version) {
        return Attribute::where('id', $id)
            ->where('version', $version)
            ->update([
                'name' => $data['name'],
                'version' => $version + 1
            ]);
    }
}