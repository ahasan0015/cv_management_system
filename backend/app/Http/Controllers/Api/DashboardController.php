<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\DashboardRepositoryInterface;
use App\Http\Resources\PositionResource;

class DashboardController extends Controller
{
    protected $dashboardRepo;

    public function __construct(DashboardRepositoryInterface $dashboardRepo)
    {
        $this->dashboardRepo = $dashboardRepo;
    }

    public function index()
    {
        $data = $this->dashboardRepo->getDashboardData();

        return response()->json([
            'success' => true,
            'message' => 'Dashboard data fetched successfully',
            'data' => [
                'latest_positions' => PositionResource::collection($data['latest_positions']),
                'popular_positions' => PositionResource::collection($data['popular_positions']),
                'stats' => $data['stats']
            ]
        ]);
    }
}