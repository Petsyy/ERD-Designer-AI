export interface DiagramColumn {
    id: number;
    diagram_table_id: number;
    name: string;
    data_type: string;
    length: number | null;
    scale: number | null;
    is_primary: boolean;
    is_nullable: boolean;
    is_unique: boolean;
    is_unsigned: boolean;
    is_auto_increment: boolean;
    default_value: string | null;
    comment: string | null;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
}

export interface DiagramTable {
    id: number;
    project_id: number;
    name: string;
    color: string;
    icon: string | null;
    note: string | null;
    position_x: number;
    position_y: number;
    diagram_columns: DiagramColumn[];
    created_at?: string;
    updated_at?: string;
}

export interface Relationship {
    id: number;
    project_id: number;
    source_table_id: number;
    target_table_id: number;
    source_column_id: number;
    target_column_id: number;
    source_table?: DiagramTable;
    target_table?: DiagramTable;
    source_column?: DiagramColumn;
    target_column?: DiagramColumn;
}

export interface Project {
    id: number;
    name: string;
    description: string | null;
    canvas_x: number;
    canvas_y: number;
    zoom: number;
    diagram_tables: DiagramTable[];
    relationships: Relationship[];
    last_opened_at: string | null;
    created_at?: string;
    updated_at?: string;
}
