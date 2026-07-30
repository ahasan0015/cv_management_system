<?php

namespace App\Repositories;

use App\Models\CandidateProfile;
use App\Models\Attribute; 

class ProfileRepository implements ProfileRepositoryInterface
{
    public function getProfile($user)
    {
        $profile = CandidateProfile::with('projects')->firstOrCreate(
            ['user_id' => $user->id],
            [
                'info' => [],
                'is_published' => false
            ]
        );

        // all attribute fetch
        $availableAttributes = Attribute::with('attributeType')->get();

        return [
            'id' => $profile->id,
            'user_id' => $profile->user_id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'cv_path' => $profile->cv_path,
            'is_published' => (bool) $profile->is_published,
            'projects' => $profile->projects,
            'info' => $profile->info ?? [], // user save data
            'available_attributes' => $availableAttributes, 
        ];
    }

    public function updateProfile($user, array $data)
    {
        $profile = CandidateProfile::firstOrCreate(['user_id' => $user->id]);

        if (isset($data['is_published'])) {
            $profile->is_published = filter_var($data['is_published'], FILTER_VALIDATE_BOOLEAN);
            $profile->save();
        }

        if (isset($data['name'])) {
            $user->update(['name' => $data['name']]);
        }

        if (isset($data['attributes'])) {
            $profile->update([
                'info' => $data['attributes']
            ]);
        }

        $profile->load('projects');
        $availableAttributes = Attribute::with('attributeType')->get();

        return [
            'id' => $profile->id,
            'user_id' => $profile->user_id,
            'name' => $user->name,
            'email' => $user->email,
            'cv_path' => $profile->cv_path,
            'is_published' => (bool) $profile->is_published,
            'projects' => $profile->projects,
            'info' => $profile->info ?? [],
            'available_attributes' => $availableAttributes,
        ];
    }
}