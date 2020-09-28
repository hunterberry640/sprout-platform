import { Column, Row } from 'react-table';
import { ContentPosition } from 'csstype';
import { DataFrame, Field, SelectableValue } from '@grafana/data';
export declare function getTextAlign(field?: Field): ContentPosition;
export declare function getColumns(data: DataFrame, availableWidth: number, columnMinWidth: number): Column[];
export declare function filterByValue(rows: Row[], id: string, filterValues?: SelectableValue[]): Row<{}>[];
export declare function calculateUniqueFieldValues(rows: any[], field?: Field): Record<string, any>;
export declare function valuesToOptions(unique: Record<string, any>): SelectableValue[];
export declare function sortOptions(a: SelectableValue, b: SelectableValue): number;
export declare function getFilteredOptions(options: SelectableValue[], filterValues?: SelectableValue[]): SelectableValue[];
