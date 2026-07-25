import React from 'react';
import type { AdminActionButtonsProps } from '../../types/adminusers';

const AdminActionButtons: React.FC<AdminActionButtonsProps> = ({
  selectedIds,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div className="d-flex gap-2">
      {/* Status toggle (block/Active) */}
      <button
        onClick={onToggleStatus}
        className="btn btn-outline-warning btn-sm rounded-pill px-3"
        disabled={selectedIds.length === 0}
      >
        <i className="bi bi-shield-exclamation me-1"></i> Toggle Status
      </button>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="btn btn-danger btn-sm rounded-pill px-3"
        disabled={selectedIds.length === 0}
      >
        <i className="bi bi-trash me-1"></i> Delete
      </button>
    </div>
  );
};

export default AdminActionButtons;