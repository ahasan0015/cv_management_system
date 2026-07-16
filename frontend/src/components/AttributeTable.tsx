import Skeleton from "react-loading-skeleton";
import type { AttributeTableProps, PaginationLink } from "../types/attribute";

export const AttributeTable = ({
  data,
  isLoading,
  meta, 
  onPageChange,
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
    <>
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
            Array(10).fill(0).map((_, index) => (
              <tr key={index}>
                <td><Skeleton width={20} /></td> 
                <td><Skeleton height={20} width={150} /></td> 
                <td><Skeleton height={20} width={100} /></td> 
                <td><Skeleton height={20} width={80} /></td>  
                <td><Skeleton height={20} width={120} /></td> 
              </tr>
            ))
            ) : data?.length ? (
              data.map((attr) => (
                <tr
                  key={attr.id}
                  onClick={() => handleToggle(attr.id)} // toggle function call
                  className={
                    selectedIds.includes(attr.id) ? "table-active" : ""
                  }
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
      {/* Pagination Button */}
      {meta && meta.links && (
        <div className="d-flex justify-content-between align-items-center p-3">
          <div>
            Showing {meta.from} to {meta.to} of {meta.total} entries
          </div>
          <nav>
            <ul className="pagination mb-0">
              {/* type define */}
              {meta.links.map((link: PaginationLink, index: number) => (
                <li
                  key={index}
                  className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      link.url && link.page !== null && onPageChange(link.page)
                    }
                    disabled={!link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
