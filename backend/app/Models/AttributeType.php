<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AttributeType extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'attribute_types';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * Get the attributes associated with this type.
     */
    public function attributes(): HasMany
    {
        return $this->hasMany(Attribute::class, 'attribute_type_id');
    }
    
}