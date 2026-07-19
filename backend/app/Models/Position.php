<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'max_project_count', 
        'settings', // Used for JSON data
        'access_rules', 
        'project_tags',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        'settings' => 'array',
        'access_rules' => 'array', // Cast to array
        'project_tags' => 'array', // Cast to array
        'start_date' => 'date', 
        'end_date' => 'date',   
    ];

    public function attributeList(): BelongsToMany
    {
        return $this->belongsToMany(Attribute::class, 'position_attribute')
                    ->withTimestamps();
    }
}