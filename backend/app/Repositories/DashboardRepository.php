<?php
namespace App\Repositories;

use App\Models\Position;
use App\Models\Candidate; 
use App\Models\Project;   
use App\Models\User;     

class DashboardRepository implements DashboardRepositoryInterface
{
    public function getDashboardData(): array
    {
        $latestPositions = Position::latest()->take(6)->get();
        $popularPositions = Position::inRandomOrder()->take(6)->get(); 

        $stats = [
            'total_positions' => Position::count(),
            'total_candidates' => Position::count(), 
            'total_projects' => 90, 
            'total_users' => User::count(),
        ];

        return [
            'latest_positions' => $latestPositions,
            'popular_positions' => $popularPositions,
            'stats' => $stats,
        ];
    }
}