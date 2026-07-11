<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attribute extends Model
{
    protected $fillable = ['name'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function attributeType(): BelongsTo
    {
        return $this->belongsTo(AttributeType::class);
    }

    
}
