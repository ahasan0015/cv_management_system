import type { ToolbarProps } from "../types/attribute";

export const AttributeToolbar = ({
  selectedId,
  onAdd,
  onEdit,
  onDelete,
  onSearch,
  onCategoryFilter,
  categories,
  onPrefixSearch,
  onSortChange,
}: ToolbarProps) => {
  return (
    // justify-content-between
    <div className="d-flex align-items-center justify-content-between mb-3">
      {/* left side filter */}
      <div className="d-flex gap-2">
        {/* Sort (Recently Used) */}
        <select
          className="form-select form-select-sm"
          style={{ width: "150px" }}
          onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
        >
          <option value="newest">Recently Used</option>
          <option value="oldest">Oldest</option>
        </select>

        {/* Prefix Search */}
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Prefix..."
          style={{ width: "100px" }}
          onChange={(e) => onPrefixSearch(e.target.value)}
        />

        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: "200px" }}
        />

        <select
          className="form-select form-select-sm"
          onChange={(e) =>
            onCategoryFilter(
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
          style={{ width: "150px" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Right Side:Action button */}
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onAdd}
        >
          <i className="bi bi-plus-lg me-1"></i> Add
        </button>

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={onEdit}
          disabled={!selectedId}
        >
          <i className="bi bi-pencil me-1"></i> Edit
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
          disabled={!selectedId}
        >
          <i className="bi bi-trash me-1"></i> Delete
        </button>
      </div>
    </div>
  );
};
