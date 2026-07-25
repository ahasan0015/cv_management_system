import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { adminUserService } from '../../hooks/adminUserService';
import AdminToolbar from '../../components/admin/AdminToolbar';
import AdminTable from '../../components/admin/AdminTable';

import type { Role, User } from '../../types/adminusers';
import Navbar from '../../components/Navbar';



const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // search, filter and selectionState
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Pagination each page 10 items
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  async function fetchUsers() {
    try {
      const response = await adminUserService.getAll();
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRoles() {
    try {
      const response = await adminUserService.getRoles();
      if (response.data.success) {
        setRoles(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      fetchUsers();
      fetchRoles();
    });
  }, []);

  // checkbox selection handeler
  const handleSelectRow = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(currentUsers.map(u => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  // toolbar status toggle
  const handleToggleStatusSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      const targetUser = users.find(u => u.id === selectedIds[0]);
      const newStatus = targetUser?.status === 'Active' ? 'Blocked' : 'Active';

      for (const id of selectedIds) {
        await adminUserService.updateStatus(id, newStatus);
      }

      setUsers(users.map(u => selectedIds.includes(u.id) ? { ...u, status: newStatus } : u));
      setSelectedIds([]);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Selected users status changed to ${newStatus}!`,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (err) {
      console.error('Error updating status:', err);
      Swal.fire('Error!', 'Failed to update user status.', 'error');
    }
  };

  // delete handler
  const handleDeleteSelected = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete selected!'
    });

    if (result.isConfirmed) {
      try {
        for (const id of selectedIds) {
          await adminUserService.delete(id);
        }
        setUsers(users.filter(u => !selectedIds.includes(u.id)));
        setSelectedIds([]);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Selected users deleted successfully!',
          showConfirmButton: false,
          timer: 2500,
        });
      } catch (err) {
        console.error('Error deleting users:', err);
        Swal.fire('Error!', 'Failed to delete users.', 'error');
      }
    }
  };

  // User Role Change
  const handleRoleChange = async (userId: number, roleId: number) => {
    try {
      const response = await adminUserService.updateRole(userId, roleId);
      if (response.data.success) {
        fetchUsers();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'User role updated successfully!',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (err) {
      console.error('Error updating role:', err);
      Swal.fire('Error!', 'Failed to update user role.', 'error');
    }
  };

  // filtering and search logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;

    return matchesSearch && matchesRole;
  });

  // Pagination (10 items per page)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <Navbar/>
      {/* toolbar and action button*/}
      <AdminToolbar
        searchTerm={searchTerm}
        onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
        selectedRole={selectedRole}
        onRoleChange={(val) => { setSelectedRole(val); setCurrentPage(1); }}
        roles={roles}
        selectedIds={selectedIds}
        onToggleStatus={handleToggleStatusSelected}
        onDelete={handleDeleteSelected}
      />

      {/* table component */}
      <AdminTable
        users={currentUsers}
        roles={roles}
        loading={loading}
        selectedIds={selectedIds}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onRoleChange={handleRoleChange}
      />

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <nav className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
          <span className="text-muted small">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
          </span>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link rounded-start-pill" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link rounded-end-pill" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AdminUsers;