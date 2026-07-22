<?php
namespace App\Repositories;

use App\Models\CandidateProfile;

class ProjectRepository
{
    protected function getProfile($user)
    {
        return CandidateProfile::firstOrCreate(
            ['user_id' => $user->id],
            ['name' => $user->name ?? 'Candidate']
        );
    }

    public function getAllForUser($user)
    {
        $profile = $this->getProfile($user);
        return $profile->projects()->latest()->get();
    }

    public function createForUser($user, array $data)
    {
        $profile = $this->getProfile($user);
        return $profile->projects()->create($data);
    }

    public function findForUser($user, $id)
    {
        $profile = $this->getProfile($user);
        return $profile->projects()->where('id', $id)->first();
    }

    public function updateForUser($user, $id, array $data)
    {
        $project = $this->findForUser($user, $id);
        if ($project) {
            $project->update($data);
            return $project;
        }
        return null;
    }

    public function deleteForUser($user, $id)
    {
        $project = $this->findForUser($user, $id);
        if ($project) {
            return $project->delete();
        }
        return false;
    }
}