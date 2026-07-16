export interface Attribute {
  id: number;
  name: string;
  category: number;
  type: string;
  version: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null; 
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
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
  meta?: PaginationMeta;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  selectedIds: number[]; 
  onSelectionChange: (ids: number[]) => void; 
}

export interface ToolbarProps {
  selectedId: number | null;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSearch: (value: string) => void;
  onCategoryFilter: (categoryId: number | undefined) => void;
  categories: { id: number; name: string }[]; // for drop down
}

export interface AttributeFilters {
  search?: string;
  category?: number;
  prefix?: string;
  page?: number;
}