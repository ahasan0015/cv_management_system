<?php
namespace App\Repositories;

use App\Models\CandidateProfile;

class ProfileRepository
{
    public function getProfile($user)
    {
        $profile = CandidateProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'info' => [
                    'name' => $user->name ?? 'Candidate',
                    'email' => $user->email,
                ]
            ]
        );

        // info 
        $data = $profile->info ?? [];
        $data['id'] = $profile->id;
        $data['user_id'] = $profile->user_id;
        $data['cv_path'] = $profile->cv_path;

        return $data;
    }

    public function updateProfile($user, array $data)
    {
        $profile = CandidateProfile::firstOrCreate(['user_id' => $user->id]);

        // update json data
        $currentInfo = $profile->info ?? [];

        // if first and last name available then update
        if (isset($data['first_name']) || isset($data['last_name'])) {
            $firstName = $data['first_name'] ?? ($currentInfo['first_name'] ?? '');
            $lastName = $data['last_name'] ?? ($currentInfo['last_name'] ?? '');
            $data['name'] = trim("{$firstName} {$lastName}");
        }

        $mergedInfo = array_merge($currentInfo, $data);

        $profile->update([
            'info' => $mergedInfo
        ]);

        $result = $mergedInfo;
        $result['id'] = $profile->id;
        $result['user_id'] = $profile->user_id;
        $result['cv_path'] = $profile->cv_path;

        return $result;
    }
}