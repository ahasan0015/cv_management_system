import { useState } from 'react';
import { useAttributes } from "../hooks/useAttributes";
import { AttributeToolbar } from '../components/AttributeToolbar';
import { AttributeTable } from '../components/AttributeTable';

const AttributePage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading } = useAttributes();

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h3 className="fw-bold">Attribute Library</h3>
      </div>

        <div className="col-auto">
          <AttributeToolbar 
            selectedId={selectedId}
            onAdd={() => console.log("Open Add")}
            onEdit={() => console.log("Open Edit:", selectedId)}
            onDelete={() => console.log("Delete:", selectedId)}
          />
        </div>
      <div className="row">

        {/* Table */}
        <div className="col">
          <div className="card border-0 shadow-sm">
            <AttributeTable 
              data={data}
              isLoading={isLoading}
              selectedId={selectedId}
              onRowSelect={(id: number) => setSelectedId(prev => prev === id ? null : id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributePage;