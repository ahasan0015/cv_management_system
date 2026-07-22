import { useState } from "react";
import { usePositions, useDuplicatePosition } from "../../hooks/usePosition";
import { positionService } from "../../services/positionService";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { PositionToolbar } from "../../components/PositionToolbar";
import { PositionTable } from "../../components/PositionTable";

import type { Position } from "../../types/position";
import { useAttributes } from "../../hooks/useAttributes";
import type { PositionFormData } from "../../types/positionModal";
import { PositionModal } from "../../components/PositionModal";
import type { ApiErrorResponse, AttributeOption } from "../../types/positionPage";



const PositionsPage = () => {
    // States
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // For Edit Mode
    const [editingPosition, setEditingPosition] = useState<Position | null>(null);

    // Data Fetching
    const { data, isLoading, refetch } = usePositions(page);
    const duplicateMutation = useDuplicatePosition();
    const { data: attributesData } = useAttributes();
    
    const attributesList: AttributeOption[] = Array.isArray(attributesData) 
        ? attributesData 
        : ((attributesData as { data?: AttributeOption[] })?.data || []);

    // Page change handler
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // --- CRUD Handlers ---

    // Save & Update Handler
    const handleSave = async (formData: PositionFormData, id?: number) => {
        setIsSubmitting(true);
        try {
            if (id) {
                // Update existing position
                await positionService.update(id, formData);
                toast.success("Position updated successfully!");
            } else {
                // Create new position
                await positionService.create(formData);
                toast.success("Position created successfully!");
            }

            setShowModal(false);
            setEditingPosition(null);
            refetch(); 
        } catch (error: unknown) {
            console.error("Save error:", error);
            const err = error as ApiErrorResponse;
            toast.error(err?.response?.data?.message || "Failed to save position.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete Handler with SweetAlert
    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete ${selectedIds.length} selected position(s)?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await Promise.all(selectedIds.map((id) => positionService.delete(id)));
            toast.success("Positions deleted successfully!");
            setSelectedIds([]);
            refetch();
        } catch (error: unknown) {
            console.error("Delete error:", error);
            toast.error("Failed to delete positions.");
        }
    };

    // Duplicate Handler
    const handleDuplicate = () => {
        if (selectedIds.length === 1) {
            duplicateMutation.mutate(selectedIds[0], {
                onSuccess: () => {
                    toast.success("Position duplicated successfully!");
                    setSelectedIds([]);
                    refetch();
                },
                onError: () => toast.error("Failed to duplicate position"),
            });
        }
    };

    return (
        <div className="container-fluid p-4">
            {/* Position Modal Component */}
            <PositionModal
                key={editingPosition ? editingPosition.id : "new-position"}
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingPosition(null);
                }}
                onSave={handleSave}
                isSubmitting={isSubmitting}
                initialData={editingPosition}
                attributesList={attributesList} 
            />

            <div className="mb-4">
                <h3 className="fw-bold">Positions</h3>
            </div>

            <div className="col-auto mb-3">
                {/* Toolbar Component */}
                <PositionToolbar
                    selectedIds={selectedIds}
                    selectedId={selectedIds.length > 0 ? selectedIds[0] : null}
                    onAdd={() => {
                        setEditingPosition(null);
                        setShowModal(true);
                    }}
                    onEdit={() => {
                        const item = data?.data?.find(
                            (i: Position) => i.id === selectedIds[0]
                        );
                        if (item) {
                            setEditingPosition(item);
                            setShowModal(true);
                        }
                    }}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onSearch={(val: string) => console.log("Search logic:", val)}
                />
            </div>

            <div className="row">
                <div className="col">
                    <div className="card shadow-sm border-0">
                        {/* Table Component */}
                        <PositionTable
                            data={data?.data || []}
                            isLoading={isLoading}
                            meta={data?.meta}
                            selectedIds={selectedIds}
                            onSelectionChange={setSelectedIds}
                            onPageChange={handlePageChange}
                            attributesList={attributesList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PositionsPage;