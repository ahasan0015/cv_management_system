import React from 'react';
import AdminActionButtons from './AdminActionButtons.tsx';
import type { AdminToolbarProps } from '../../types/adminUsers.ts';


const AdminToolbar: React.FC<AdminToolbarProps> = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  roles,
  selectedIds,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center gap-3 mb-4">
      {/* Page Titel and Subtitle*/}
      <div>
        <h4 className="fw-bold mb-1">User Management</h4>
        <p className="text-muted mb-0 small">Manage system users, update roles, and control account access.</p>
      </div>

      {/* serch, filter and action controll*/}
      <div className="d-flex align-items-center gap-2 flex-wrap">
        {/* role filter drop down*/}
        <select
          className="form-select form-select-sm rounded-pill px-3"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          style={{ width: '150px' }}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name.toUpperCase()}
            </option>
          ))}
        </select>

        {/* search input */}
        <div className="input-group input-group-sm" style={{ width: '200px' }}>
          <input
            type="text"
            className="form-control rounded-pill px-3"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* action button*/}
        <AdminActionButtons 
          selectedIds={selectedIds}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default AdminToolbar;