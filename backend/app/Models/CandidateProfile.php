<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidateProfile extends Model
{
    protected $fillable = [
        'user_id', 
        'info', 
        'cv_path'
    ];

    // JSON fields into array
    protected $casts = [
        'info' => 'array',
    ];

    // relation
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}