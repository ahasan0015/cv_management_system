import type { Position } from "./position";

export interface AttributeOption {
  id: number;
  name: string;
}

export interface PositionTableProps {
  data: Position[];
  isLoading: boolean;
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
    from?: number;
    to?: number;
  };
  onPageChange: (page: number) => void;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  attributesList?: AttributeOption[];
}

export interface AttributeItem {
  id?: number | string;
  name?: string;
  title?: string;
}

