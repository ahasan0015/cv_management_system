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
}