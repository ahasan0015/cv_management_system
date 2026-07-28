<?php

namespace App\Repositories;

use App\Models\CandidateProfile;


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

        $data = $profile->info ?? [];
        
        // Single Source of Truth: users table name and email
        $data['name'] = $user->name;
        $data['email'] = $user->email;
        
        $data['id'] = $profile->id;
        $data['user_id'] = $profile->user_id;
        $data['cv_path'] = $profile->cv_path;
        $data['is_published'] = (bool) $profile->is_published;
        $data['projects'] = $profile->projects;

        return $data;
    }

    public function updateProfile($user, array $data)
    {
        $profile = CandidateProfile::firstOrCreate(['user_id' => $user->id]);

        $currentInfo = $profile->info ?? [];

        // Handle is_published column update
        if (isset($data['is_published'])) {
            $profile->is_published = filter_var($data['is_published'], FILTER_VALIDATE_BOOLEAN);
            $profile->save();
            unset($data['is_published']); 
        }

        // name update
        if (isset($data['name'])) {
            $user->update(['name' => $data['name']]);
            unset($data['name']);
        }

        // email 
        if (isset($data['email'])) {
            unset($data['email']); 
        }

        $mergedInfo = array_merge($currentInfo, $data);

        $profile->update([
            'info' => $mergedInfo
        ]);

        // response
        $result = $mergedInfo;
        $result['name'] = $user->name; // users 
        $result['email'] = $user->email; // users 
        $result['id'] = $profile->id;
        $result['user_id'] = $profile->user_id;
        $result['cv_path'] = $profile->cv_path;
        $result['is_published'] = (bool) $profile->is_published;
        $result['projects'] = $profile->projects;

        return $result;
    }
}