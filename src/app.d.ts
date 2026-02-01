declare global {
	namespace App {}
}

declare module 'simple-datatables' {
	export { DataTable } from 'simple-datatables/dist/dts/datatable';
	export { convertCSV, convertJSON } from 'simple-datatables/dist/dts/convert';
	export { exportCSV, exportJSON, exportSQL, exportTXT } from 'simple-datatables/dist/dts/export';
	export { createElement, isJson, isObject } from 'simple-datatables/dist/dts/helpers';
	export { makeEditable } from 'simple-datatables/dist/dts/editing';
	export { addColumnFilter } from 'simple-datatables/dist/dts/column_filter';

	export type {
		DataTableOptions,
		DataTableConfiguration,
		ColumnOption,
		cellType,
		inputCellType,
		dataRowType,
		inputRowType,
		headerCellType,
		inputHeaderCellType,
		TableDataType,
		DataOption,
		renderType,
		nodeType,
		elementNodeType,
		textNodeType,
		cellDataType
	} from 'simple-datatables/dist/dts/datatable';

	export interface SelectableDataRow {
		selected?: boolean;
		[key: string]: any;
	}

	declare const __NAME__: string;
	declare const __VERSION__: string;
	declare const __GITHUBURL__: string;
	declare const __SVELTEVERSION__: string;
	declare const __SVELTEKITVERSION__: string;
	declare const __VITEVERSION__: string;
	declare const __TAILWINDCSSVERSION__: string;
	declare const __TAILWINDMERGE__: string;
}

export {};
