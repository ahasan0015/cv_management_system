<?php

namespace App\Repositories;

use App\Models\Attribute;

class AttributeRepository implements AttributeRepositoryInterface {
    
   // app/Repositories/AttributeRepository.php

public function getAll(array $filters = [], int $perPage = 10 ){
    // query
    $query = Attribute::query()
        ->select(['id', 'name', 'category_id', 'attribute_type_id', 'version'])
        ->with(['category:id,name', 'attributeType:id,name'])
        ->search($filters['search'] ?? null)
        ->byCategory($filters['category'] ?? null)
        ->byPrefix($filters['prefix'] ?? null)
        ->bySort($filters['sort'] ?? 'newest');
    return $query->paginate($perPage);
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