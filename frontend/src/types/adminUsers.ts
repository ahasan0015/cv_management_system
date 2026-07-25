
export interface AdminActionButtonsProps {
  selectedIds: number[];
  onToggleStatus: () => void;
  onDelete: () => void;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string | null;
  status: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface AdminTableProps {
  users: User[];
  roles: Role[];
  loading: boolean;
  selectedIds: number[];
  onSelectRow: (id: number) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (userId: number, roleId: number) => void;
}

export interface AdminToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  roles: { id: number; name: string }[];
  selectedIds: number[];
  onToggleStatus: () => void;
  onDelete: () => void;
}
