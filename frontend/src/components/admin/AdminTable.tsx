import React from 'react';
import type { AdminTableProps } from '../../types/adminUsers';





const AdminTable: React.FC<AdminTableProps> = ({
  users,
  roles,
  loading,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onRoleChange,
}) => {
  const isAllSelected = users.length > 0 && users.every(u => selectedIds.includes(u.id));

  return (
    <div className="table-responsive w-100">
      <table className="table table-hover align-middle mb-0 text-nowrap">
        <thead className="table-light">
          <tr>
            <th className="py-3 rounded-start" style={{ width: '40px' }}>
              <input 
                type="checkbox" 
                className="form-check-input"
                checked={isAllSelected}
                onChange={onSelectAll}
              />
            </th>
            <th className="py-3">Name</th>
            <th className="py-3">Email</th>
            <th className="py-3">Role</th>
            <th className="py-3 rounded-end">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="placeholder-glow">
                <td className="py-3"><span className="placeholder col-4 rounded bg-secondary opacity-25"></span></td>
                <td className="py-3"><span className="placeholder col-7 rounded bg-secondary opacity-25"></span></td>
                <td className="py-3"><span className="placeholder col-9 rounded bg-secondary opacity-25"></span></td>
                <td className="py-3"><span className="placeholder col-5 rounded bg-secondary opacity-25"></span></td>
                <td className="py-3"><span className="placeholder col-4 rounded bg-secondary opacity-25"></span></td>
              </tr>
            ))
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input 
                    type="checkbox" 
                    className="form-check-input"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => onSelectRow(user.id)}
                  />
                </td>
                <td>
                  <div className="fw-semibold text-dark">{user.name}</div>
                </td>
                <td>
                  <span className="text-muted">{user.email}</span>
                </td>
                <td>
                  <select 
                    className="form-select form-select-sm w-auto rounded-pill"
                    onChange={(e) => onRoleChange(user.id, Number(e.target.value))}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {user.role ? user.role.toUpperCase() : 'Select Role'}
                    </option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <span className={`badge ${user.status === 'Blocked' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} rounded-pill px-3 py-1`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;