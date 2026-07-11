interface Attribute {
  id: number;
  name: string;
  category: string;
  type: string;
  version: number;
}



interface AttributeTableProps {
  data: Attribute[] | undefined;
  isLoading: boolean;
  selectedId: number | null;
  onRowSelect: (id: number) => void;
}

export const AttributeTable = ({
  data,
  isLoading,
  selectedId,
  onRowSelect,
}: AttributeTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4">Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Version</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : data?.length ? (
            data.map((attr) => (
              <tr
                key={attr.id}
                onClick={() => onRowSelect(attr.id)}
                className={selectedId === attr.id ? "table-active" : ""}
                style={{ cursor: "pointer" }}
              >
                <td className="ps-4">
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
                  <span className="badge bg-success">
                    Active
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No attributes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};