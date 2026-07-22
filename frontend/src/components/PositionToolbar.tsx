import type { PositionToolbarProps } from "../types/position";



export const PositionToolbar = ({
  selectedIds,
  onAdd,
  onEdit,
  onDelete,
  onDuplicate,
  onSearch,
}: PositionToolbarProps) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Search positions..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: "250px" }}
      />
      <div className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" onClick={onAdd}>
          <i className="bi bi-plus-lg me-1"></i> Add
        </button>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={onEdit}
          disabled={selectedIds.length !== 1}
        >
          <i className="bi bi-pencil me-1"></i> Edit
        </button>
        <button
          className="btn btn-outline-info btn-sm"
          onClick={onDuplicate}
          disabled={selectedIds.length !== 1}
        >
          <i className="bi bi-copy me-1"></i> Duplicate
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
          disabled={selectedIds.length === 0}
        >
          <i className="bi bi-trash me-1"></i> Delete
        </button>
      </div>
    </div>
  );
};
