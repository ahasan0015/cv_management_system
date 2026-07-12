import type { ToolbarProps } from "../types/attribute";


export const AttributeToolbar = ({
  selectedId,
  onAdd,
  onEdit,
  onDelete,
}: ToolbarProps) => {
  return (
    // justify-content-end
    <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
      {/* Add */}
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={onAdd}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Add New"
      >
        <i className="bi bi-plus-lg me-1"></i>
        Add
      </button>

      {/* Edit */}
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Edit Selected"
      >
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={onEdit}
          disabled={!selectedId}
        >
          <i className="bi bi-pencil me-1"></i>
          Edit
        </button>
      </span>

      {/* Delete - span wrap disabled  */}
      <span
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Delete Selected"
      >
        <button
          className="btn btn-danger"
          onClick={onDelete}
          disabled={!selectedId}
        >
          Delete
        </button>
      </span>
    </div>
  );
};
