<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'type', 'category_id', 'version'];
    public function attributes() {
        return $this->hasMany(Attribute::class);
    }
}
