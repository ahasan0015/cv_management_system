export interface AccessRules {
  min_experience: number;
  roles: string[];
}

export interface Position {
  id: number;
  title: string;
  description: string;
  max_project_count: number;
  start_date: string;
  end_date: string;
  access_rules: AccessRules;
  project_tags: string[];
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_positions: number;
  total_candidates: number;
  total_projects: number;
  total_users: number;
}

export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: {
    latest_positions: Position[];
    popular_positions: Position[];
    stats: DashboardStats;
  };
}