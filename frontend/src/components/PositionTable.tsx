import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { AttributeItem, PositionTableProps } from "../types/positionTable";


export const PositionTable = ({ 
  data, 
  isLoading, 
  meta, 
  onPageChange, 
  selectedIds, 
  onSelectionChange,
  attributesList = []
}: PositionTableProps) => {
  
  const handleToggle = (id: number) => {
    onSelectionChange(selectedIds.includes(id) 
      ? selectedIds.filter((item) => item !== id) 
      : [...selectedIds, id]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange(data.map((item) => item.id));
    } else {
      onSelectionChange([]);
    }
  };

  // Helper function to resolve attribute name without any re-assignment (let)
  const resolveAttributeName = (attrItem: number | string | AttributeItem): string => {
    if (typeof attrItem === "object" && attrItem !== null) {
      const itemObj = attrItem as AttributeItem;
      return itemObj.name || itemObj.title || "";
    }
    const foundObj = attributesList.find(
      (a) => String(a.id) === String(attrItem)
    );
    return foundObj ? foundObj.name : `Attr #${attrItem}`;
  };

  return (
    <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-uppercase fs-7 text-secondary">
            <tr>
              <th style={{ width: "40px" }} className="ps-3">
                <input 
                  type="checkbox" 
                  className="form-check-input"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Position & Description</th>
              <th className="text-center">Projects</th>
              <th>Attributes</th>
              <th>Access Rules</th>
              <th>Project Tags</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i}>
                  <td className="ps-3"><Skeleton width={20} /></td>
                  <td><Skeleton width={150} height={16} /><br /><Skeleton width={200} height={12} /></td>
                  <td className="text-center"><Skeleton width={40} /></td>
                  <td><Skeleton width={90} /></td>
                  <td><Skeleton width={110} /></td>
                  <td><Skeleton width={100} /></td>
                  <td><Skeleton width={90} /></td>
                </tr>
              ))
            ) : data && data.length > 0 ? (
              data.map((pos) => {
                // Parse Access Rules safely
                let exp = 0;
                let roles: string[] = [];
                try {
                  const rules = typeof pos.access_rules === "string" 
                    ? JSON.parse(pos.access_rules) 
                    : pos.access_rules;
                  exp = rules?.min_experience || 0;
                  roles = rules?.roles || [];
                } catch {
                  // Fallback
                }

                // Parse Project Tags safely
                const tags: string[] = Array.isArray(pos.project_tags)
                  ? pos.project_tags
                  : typeof pos.project_tags === "string" && pos.project_tags.trim() !== ""
                  ? pos.project_tags.split(",").map((t: string) => t.trim())
                  : [];

                const rawAttrs = pos.attributes || [];

                return (
                  <tr 
                    key={pos.id} 
                    onClick={() => handleToggle(pos.id)} 
                    className={selectedIds.includes(pos.id) ? "table-active" : ""}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="ps-3" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={selectedIds.includes(pos.id)} 
                        onChange={() => handleToggle(pos.id)}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{pos.title}</div>
                      <small className="text-muted text-truncate d-block" style={{ maxWidth: "200px" }}>
                        {pos.description || "No description"}
                      </small>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark border px-2 py-1">
                        {pos.max_project_count}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1" style={{ maxWidth: "160px" }}>
                        {rawAttrs.length > 0 ? (
                          rawAttrs.map((attrItem: number | string | AttributeItem, idx: number) => {
                            const foundName = resolveAttributeName(attrItem);

                            if (!foundName) return null;

                            return (
                              <span key={idx} className="badge bg-info text-dark" style={{ fontSize: "11px" }}>
                                {foundName}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-muted small">None</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="small">
                        <div><span className="fw-semibold text-secondary">Exp:</span> {exp} yrs</div>
                        <div className="d-flex flex-wrap gap-1 mt-1">
                          {roles.map((role: string, idx: number) => (
                            <span key={idx} className="badge bg-success" style={{ fontSize: "10px" }}>
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1" style={{ maxWidth: "160px" }}>
                        {tags.map((tag: string, idx: number) => (
                          <span key={idx} className="badge bg-primary bg-opacity-75" style={{ fontSize: "10px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="small text-muted text-nowrap">
                        <div><span className="fw-semibold">From:</span> {pos.start_date || "N/A"}</div>
                        <div><span className="fw-semibold">To:</span> {pos.end_date || "N/A"}</div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5 text-muted">No positions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {meta && (
        <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Showing {meta.from || 1} to {meta.to || data.length} of {meta.total} results
          </small>
          
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${meta.current_page === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => onPageChange(meta.current_page - 1)}
                  disabled={meta.current_page === 1}
                >
                  Prev
                </button>
              </li>

              <li className="page-item active">
                <span className="page-link">{meta.current_page}</span>
              </li>

              <li className={`page-item ${meta.current_page === meta.last_page ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => onPageChange(meta.current_page + 1)}
                  disabled={meta.current_page === meta.last_page}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};