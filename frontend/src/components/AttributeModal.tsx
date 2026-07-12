import { useState } from "react";
import type { AttributeFormData, AttributeModalProps } from "../types/attribute";

// categories data recive
export const AttributeModal = ({
  show,
  onClose,
  onSave,
  isSubmitting,
  categories = [], // Default empty array
  types = [],
}: AttributeModalProps) => {
  // const [form, setForm] = useState({ name: "", category: 0, type: "" });
  const [form, setForm] = useState<AttributeFormData>({
    name: "", 
    category: 0, 
    type: "" 
  });

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Attribute</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Name Input */}
            <input
              className="form-control mb-2"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Dynamic Type Dropdown */}
            <select
              className="form-select mb-2"
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type.id} value={type.slug}>
                  {type.name}
                </option>
              ))}
            </select>

            {/* Dynamic Category Dropdown */}
            <select
              className="form-select mb-2"
              onChange={(e) =>
                setForm({ ...form, category: parseInt(e.target.value) })
              }
            >
              <option value="0">Select Category</option>
              {/* categories map*/}
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              disabled={isSubmitting}
              onClick={() => onSave(form)}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
