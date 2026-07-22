// types/position.ts

// Common Pagination Meta Type (যদি attribute.ts থেকে ইমপোর্ট করতে সমস্যা হয়, তবে এখানে ডিফাইন করে নেওয়া নিরাপদ)
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from?: number;
  to?: number;
}

// Attribute Option Type for Table & Modal
export interface AttributeOption {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  title: string;
  description: string;
  max_project_count: number;
  start_date: string;
  end_date: string;
  attributes: number[] | { id: number; name: string }[];
  access_rules?: {
    min_experience?: number;
    roles?: string[];
  } | string;
  project_tags?: string[] | string;
}

export interface TableProps {
  data: Position[];
  isLoading: boolean;
  meta?: PaginationMeta;
  onPageChange: (page: number) => void;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  attributesList?: AttributeOption[]; // টেবিলে অ্যাট্রিবিউটের নাম দেখানোর জন্য এটি জরুরি
}

export interface PositionToolbarProps {
  selectedIds: number[];
  selectedId?: number | null; // Toolbar-এর সুবিধার জন্য অপশনাল রাখা হলো
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onSearch: (val: string) => void;
}