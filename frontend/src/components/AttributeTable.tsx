import type { AttributeTableProps } from "../types/attribute";


export const AttributeTable = ({
  data,
  isLoading,
  selectedIds,
  onSelectionChange,
}: AttributeTableProps) => {

  // toogle helper function
  const handleToggle = (id: number) => {
    if (selectedIds.includes(id)) {
      // if id exists remove this and get new array
      onSelectionChange(selectedIds.filter((item) => item !== id));
    } else {

      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: "50px" }} className="ps-3">
              <i className="bi bi-check-square"></i>
            </th>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Version</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : data?.length ? (
            data.map((attr) => (
              <tr
                key={attr.id}
                onClick={() => handleToggle(attr.id)} // toggle function call
                className={selectedIds.includes(attr.id) ? "table-active" : ""}
                style={{ cursor: "pointer" }}
              >
                {/* cheackbox colum */}
                <td className="ps-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedIds.includes(attr.id)} // cheack array id
                    onChange={() => handleToggle(attr.id)}
                    onClick={(e) => e.stopPropagation()} // 
                  />
                </td>

                <td className="ps-2">
                  <i className="bi bi-tag text-primary me-2"></i>
                  {attr.name}
                </td>

                <td>
                  <span className="badge bg-light text-dark border">
                    {attr.category}
                  </span>
                </td>

                <td>{attr.type}</td>

                <td>
                  <code>v{attr.version}</code>
                </td>

                <td>
                  <span className="badge bg-success">Active</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No attributes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};