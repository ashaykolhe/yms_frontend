<script lang="ts">
	import { Table } from '@flowbite-svelte-plugins/datatable';
	let { data } = $props();
	let longVideos = data.longVideos;
	let shortVideos = data.shortVideos;
	// console.log(data.longVideos);

	import type { DataTableOptions } from '@flowbite-svelte-plugins/datatable';

	// // Define types for the render function parameters
	// interface CellNode {
	// 	nodeName: string;
	// 	attributes?: Record<string, string | number>;
	// 	childNodes?: (CellNode | TextNode)[];
	// }

	// interface TextNode {
	// 	nodeName: '#text';
	// 	data: string;
	// }

	// interface TableCell {
	// 	childNodes: (CellNode | TextNode)[];
	// 	data: any;
	// }

	// interface TableRow {
	// 	attributes?: Record<string, string>;
	// 	cells: TableCell[];
	// }

	// // Price column cell manipulation
	// const renderButton = function (
	// 	_data: any,
	// 	cell: TableCell,
	// 	dataIndex: number,
	// 	_cellIndex: number
	// ): void {
	// 	cell.childNodes.push({
	// 		nodeName: 'BUTTON',
	// 		attributes: {
	// 			'data-row': dataIndex,
	// 			class: 'buy-now'
	// 		},
	// 		childNodes: [
	// 			{
	// 				nodeName: '#text',
	// 				data: 'Buy Now!'
	// 			}
	// 		]
	// 	});
	// };

	// const cellRendererOptions: DataTableOptions = {
	// 	data: {
	// 		headings: [...data.headings],
	// 		data: data.data.map((row) => [...row])
	// 	},
	// 	rowRender: (row: TableRow, tr: TableRow, _index: number) => {
	// 		if ([true, false].includes(row.cells[3].data)) {
	// 			if (!tr.attributes) {
	// 				tr.attributes = {};
	// 			}
	// 			if (!tr.attributes.class) {
	// 				tr.attributes.class = row.cells[3].data === true ? 'yes' : 'no';
	// 			} else {
	// 				tr.attributes.class += row.cells[3].data === true ? ' yes' : ' no';
	// 			}
	// 		}
	// 	},
	// 	columns: [
	// 		{
	// 			select: 0,
	// 			hidden: true,
	// 			type: 'number'
	// 		},
	// 		{
	// 			select: 1,
	// 			render: renderIcon,
	// 			type: 'string'
	// 		},
	// 		{
	// 			select: 2,
	// 			render: renderButton,
	// 			type: 'number'
	// 		},
	// 		{
	// 			select: 3,
	// 			render: renderYesNo,
	// 			type: 'boolean'
	// 		},
	// 		{
	// 			select: 4,
	// 			render: renderHighLow,
	// 			type: 'number'
	// 		}
	// 	]
	// };
</script>

<Table items={longVideos} />

<Table items={shortVideos} />
