<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'candidate_profile_id', 
        'name', 
        'date_start', 
        'date_end', 
        'markdown_description', 
        'tags'
    ];

    protected $casts = [
        'tags' => 'array',
        'date_start' => 'date',
        'date_end' => 'date',
    ];

      public function candidate(): BelongsTo
    {
        return $this->belongsTo(CandidateProfile::class, 'candidate_profile_id');
    }
}