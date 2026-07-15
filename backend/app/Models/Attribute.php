<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = ['name', 'category_id', 'attribute_type_id', 'version'];

    public function category() {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    public function attributeType() {
        return $this->belongsTo(\App\Models\AttributeType::class, 'attribute_type_id');
    }

    public function scopeSearch($query, $search)
    {
    // Full-text search full text search
    return $query->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"));
    }

    public function scopeByCategory($query, $category)
    {
    return $query->when($category, fn($q) => $q->where('category_id', $category));
    }

    public function scopeByPrefix($query, $prefix)
    {
    return $query->when($prefix, fn($q) => $q->where('name', 'like', "{$prefix}%"));
    }
}