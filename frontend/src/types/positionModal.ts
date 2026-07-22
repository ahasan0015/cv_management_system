import type { Position } from "./position";

export interface PositionFormData {
  title: string;
  description: string;
  max_project_count: number;
  start_date: string;
  end_date: string;
  attributes: number[];
  access_rules: string;
  project_tags: string;
}

export interface AttributeOption {
  id: number;
  name: string;
}

export type AccessRulesType = {
  min_experience?: number;
  roles?: string[];
};

export type ExtendedPosition = Omit<Position, "attributes"> & {
  attributes?: number[] | string[] | { id: number }[];
  attributes_ids?: number[];
  start_date?: string;
  end_date?: string;
  access_rules?: string | AccessRulesType;
  project_tags?: string | string[];
};

export interface PositionModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: PositionFormData, id?: number) => void;
  isSubmitting: boolean;
  attributesList?: AttributeOption[];
  initialData?: Position | null;
}