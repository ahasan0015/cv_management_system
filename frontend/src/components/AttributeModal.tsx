import { useState } from "react";
import type {
  AttributeFormData,
  AttributeModalProps,
} from "../types/attribute";

// initialData
export const AttributeModal = ({
  show,
  onClose,
  onSave,
  isSubmitting,
  categories = [],
  types = [],
  initialData,
}: AttributeModalProps) => {
// initialData to state
const [form, setForm] = useState<AttributeFormData>({
  name: initialData?.name || "",

  category: categories.find((c) => String(c.name) === String(initialData?.category))?.id || 0,

    type: types.find((t) => String(t.name) === String(initialData?.type))?.slug || "",
});
  // console.log("Current Form State:", form);
// console.log("Categories List:", categories);
  
  

  // for edit mode handle

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {initialData ? "Edit Attribute" : "Add New Attribute"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Name Input */}
            <input
              className="form-control mb-2"
              placeholder="Name"
              value={form.name} // value
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Dynamic Type Dropdown */}
            <select
              className="form-select mb-2"
              value={form.type} // value
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
              value={form.category} // value 
              onChange={(e) =>
                setForm({ ...form, category: parseInt(e.target.value) })
              }
            >
              <option value="0">Select Category</option>
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
              onClick={() => onSave(form, initialData?.id)}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
