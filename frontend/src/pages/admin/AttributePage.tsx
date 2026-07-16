import { useState } from "react";
import { useAttributes } from "../../hooks/useAttributes";
import { AttributeToolbar } from "../../components/AttributeToolbar";
import { AttributeTable } from "../../components/AttributeTable";

import { attributeService } from "../../services/attributeService";

import { useAttributeTypes } from "../../hooks/useAttributeTypes";
import type {
  Attribute,
  AttributeFilters,
  AttributeFormData,
} from "../../types/attribute";
import { AttributeModal } from "../../components/AttributeModal";
import { useCategories } from "../../hooks/useCategories";

const AttributePage = () => {
  // State Management
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<AttributeFilters>({ page: 1 });

  // Data Fetching
  const { data, isLoading, refetch } = useAttributes(filters);
  // console.log("Raw Data from API:", data);
  const { data: categories = [] } = useCategories();
  const { data: types = [] } = useAttributeTypes();

  // for page switch
const handlePageChange = (newPage: number) => {
  setFilters((prev) => ({ ...prev, page: newPage }));
};

  // for edit
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null,
  );

  // filter update handeler
  const handleFilterUpdate = (newFilters: AttributeFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  
  // --- CRUD Handlers ---

  const handleSave = async (formData: AttributeFormData, id?: number) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        category: parseInt(formData.category.toString()) || 0,
        version: 1,
      };

      if (id) {
        await attributeService.update(id, payload);
        alert("Attribute updated successfully!");
      } else {
        await attributeService.create(payload);
        alert("Attribute added successfully!");
      }

      setShowModal(false);
      setEditingAttribute(null);
      refetch();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save attribute.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.length} selected item(s)?`,
      )
    ) {
      try {
        await Promise.all(selectedIds.map((id) => attributeService.delete(id)));
        alert("Attributes deleted successfully!");
        setSelectedIds([]);
        refetch();
      } catch (error: unknown) {
        // Correcting this to avoid 'any'
        console.error("Delete error:", error);
        alert("Failed to delete attributes.");
      }
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Modal component */}
      <AttributeModal
        key={editingAttribute ? editingAttribute.id : "new-attribute"}
        show={showModal}
        initialData={editingAttribute}
        categories={categories}
        onClose={() => {
          setShowModal(false);
          setEditingAttribute(null);
        }}
        types={types}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />

      <div className="mb-4">
        <h3 className="fw-bold">Attribute Library</h3>
      </div>

      <div className="col-auto mb-3">
        {/* Toolbar */}
        <AttributeToolbar
          selectedId={selectedIds.length > 0 ? selectedIds[0] : null}
          onAdd={() => {
            setEditingAttribute(null);
            setShowModal(true);
          }}
          onEdit={() => {
            // find selected id
            const item = data?.data?.find((i: Attribute) => i.id === selectedIds[0]);
            if (item) {
              setEditingAttribute(item);
              setShowModal(true);
            }
          }}
          onDelete={handleDelete}
          categories={categories}
          onSearch={(val) => handleFilterUpdate({ search: val })}
          onCategoryFilter={(id) => handleFilterUpdate({ category: id })}
        />
      </div>

      <div className="row">
        <div className="col">
          <div className="card border-0 shadow-sm">
            {/* Table Component */}
            <AttributeTable
              // data={data}
              data={data?.data || []}
              meta={data?.meta} // এখানে meta টি পাস করুন
              onPageChange={handlePageChange} // হ্যান্ডলারটি পাঠান
              isLoading={isLoading}
              selectedIds={selectedIds}
              onSelectionChange={(ids: number[]) => setSelectedIds(ids)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributePage;
