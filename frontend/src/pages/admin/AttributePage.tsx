import { useState } from "react";
import { useAttributes } from "../../hooks/useAttributes";
import { AttributeToolbar } from "../../components/AttributeToolbar";
import { AttributeTable } from "../../components/AttributeTable";


import { attributeService } from "../../services/attributeService";

import { useAttributeTypes } from "../../hooks/useAttributeTypes";
import type { AttributeFormData } from "../../types/attribute";
import { AttributeModal } from "../../components/AttributeModal";
import { useCategories } from "../../hooks/UseCategories";

const AttributePage = () => {
  // State Management
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data Fetching
  const { data, isLoading, refetch } = useAttributes();
  const { data: categories = [] } = useCategories();
  const { data: types = [] } = useAttributeTypes();

  // --- CRUD Handlers ---

  const handleSave = async (formData: AttributeFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        // toString()
        category: parseInt(formData.category.toString()) || 0,
        version: 1,
      };

      await attributeService.create(payload);
      alert("Attribute added successfully!");
      setShowModal(false);
      refetch();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Save error:", err);
      alert(err.response?.data?.message || "Failed to save attribute.");
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
        show={showModal}
        categories={categories}
        onClose={() => setShowModal(false)}
        types={types}
        onSave={handleSave} // Now handleSave is defined and passed
        isSubmitting={isSubmitting}
      />

      <div className="mb-4">
        <h3 className="fw-bold">Attribute Library</h3>
      </div>

      <div className="col-auto mb-3">
        {/* Toolbar */}
        <AttributeToolbar
          selectedId={selectedIds.length > 0 ? selectedIds[0] : null}
          onAdd={() => setShowModal(true)}
          onEdit={() => console.log("Open Edit for:", selectedIds)}
          onDelete={handleDelete}
        />
      </div>

      <div className="row">
        <div className="col">
          <div className="card border-0 shadow-sm">
            {/* Table Component */}
            <AttributeTable
              data={data}
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
