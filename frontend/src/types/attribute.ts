export interface Attribute {
  id: number;
  name: string;
  category: number;
  type: string;
  version: number;
}

export interface AttributeModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (form: AttributeFormData, id?: number) => void;
  isSubmitting: boolean;
  categories: { id: number; name: string }[];
  types: { id: number; name: string; slug: string }[];
  initialData?: Attribute | null; 
}

export interface AttributeFormData {
  name: string;
  category: number;
  type: string;
}

export interface AttributeTableProps {
  data: Attribute[] | undefined;
  isLoading: boolean;
  selectedIds: number[]; 
  onSelectionChange: (ids: number[]) => void; 
}

export interface ToolbarProps {
  selectedId: number | null;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}