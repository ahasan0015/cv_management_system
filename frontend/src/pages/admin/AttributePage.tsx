import { useEffect, useMemo, useState } from "react";
import { useAttributes } from "../../hooks/useAttributes";
import { AttributeToolbar } from "../../components/AttributeToolbar";
import { AttributeTable } from "../../components/AttributeTable";
import { debounce } from "lodash";
import { attributeService } from "../../services/attributeService";

import { useAttributeTypes } from "../../hooks/useAttributeTypes";
import type {
  Attribute,
  AttributeFilters,
  AttributeFormData,
} from "../../types/attribute";
import { AttributeModal } from "../../components/AttributeModal";
import { useCategories } from "../../hooks/useCategories";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

  // for edit
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null,
  );

  // for page switch
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // // filter update handeler
  const handleFilterUpdate = (newFilters: AttributeFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Debounced Search using useMemo
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        handleFilterUpdate({ search: val, page: 1 });
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
        toast.success("Attribute updated successfully!"); // Toast Success
      } else {
        await attributeService.create(payload);
        toast.success("Attribute added successfully!");
      }

      setShowModal(false);
      setEditingAttribute(null);
      refetch();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save attribute."); // Toast Error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${selectedIds.length} selected item(s)?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;
    {
      try {
        await Promise.all(selectedIds.map((id) => attributeService.delete(id)));
        toast.success("Attributes deleted successfully!"); // Toast Success
        setSelectedIds([]);
        refetch();
      } catch (error: unknown) {
        // Correcting this to avoid 'any'
        console.error("Delete error:", error);
        toast.error("Failed to delete attributes."); // Toast Error
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
            const item = data?.data?.find(
              (i: Attribute) => i.id === selectedIds[0],
            );
            if (item) {
              setEditingAttribute(item);
              setShowModal(true);
            }
          }}
          onDelete={handleDelete}
          categories={categories}
          // onSearch={(val) => handleFilterUpdate({ search: val })}
          onSearch={(val) => debouncedSearch(val)}
          // onCategoryFilter={(id) => handleFilterUpdate({ category: id })}
          onCategoryFilter={(id) =>
            handleFilterUpdate({ category: id, page: 1 })
          }
          onSortChange={(val) => handleFilterUpdate({ sort: val, page: 1 })}
          onPrefixSearch={(val) => handleFilterUpdate({ prefix: val, page: 1 })}
        />
      </div>

      <div className="row">
        <div className="col">
          <div className="card border-0 shadow-sm">
            {/* Table Component */}
            <AttributeTable
              // data={data}
              data={data?.data || []}
              meta={data?.meta}
              onPageChange={handlePageChange}
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
