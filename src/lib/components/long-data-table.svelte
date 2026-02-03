<script lang="ts">
	import {
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type Row,
		type RowSelectionState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	// import type { LongSchema } from './long-schemas.js';
	import type { Attachment } from 'svelte/attachments';
	import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
	import { createSvelteTable } from '$lib/components/ui/data-table/data-table.svelte.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FlexRender,
		renderComponent,
		renderSnippet
	} from '$lib/components/ui/data-table/index.js';
	import LayoutColumnsIcon from '@tabler/icons-svelte/icons/layout-columns';
	import GripVerticalIcon from '@tabler/icons-svelte/icons/grip-vertical';
	import ChevronDownIcon from '@tabler/icons-svelte/icons/chevron-down';
	import PlusIcon from '@tabler/icons-svelte/icons/plus';
	import ChevronsLeftIcon from '@tabler/icons-svelte/icons/chevrons-left';
	import ChevronLeftIcon from '@tabler/icons-svelte/icons/chevron-left';
	import ChevronRightIcon from '@tabler/icons-svelte/icons/chevron-right';
	import ChevronsRightIcon from '@tabler/icons-svelte/icons/chevrons-right';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import LoaderIcon from '@tabler/icons-svelte/icons/loader';
	import DotsVerticalIcon from '@tabler/icons-svelte/icons/dots-vertical';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { toast } from 'svelte-sonner';
	import DataTableCheckbox from './long-data-table-checkbox.svelte';
	import DataTableCellViewer from './long-data-table-cell-viewer.svelte';
	import { createRawSnippet } from 'svelte';
	import DataTableReviewer from './long-data-table-reviewer.svelte';
	import { DragDropProvider } from '@dnd-kit-svelte/svelte';
	import { move } from '@dnd-kit/helpers';
	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
	import Edit from '@tabler/icons-svelte/icons/edit';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import LongDataTableAddNew from './long-data-table-add.svelte';
	import LongDataTableAdd from './long-data-table-add.svelte';
	import LongDataTableEdit from './long-data-table-edit.svelte';
	import LongDataTableView from './long-data-table-view.svelte';
	import { enhance } from '$app/forms';

	let { items, isAdmin, form}: { items: LongSchema[] } = $props();
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});

	export const columns: ColumnDef<LongSchema>[] = [
		// {
		// 	id: 'drag',
		// 	header: () => null,
		// 	cell: () => renderSnippet(DragHandle)
		// },
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'title',
			header: ({ column }) =>
				renderSnippet(DataTableHeader, {
					onclick: column.getToggleSortingHandler(),
					text: 'Title',
					filterOn: 'title'
				}),
			cell: ({ row }) => renderSnippet(DataTableText, { text: row.original.title })
			// enableHiding: true
		},
		{
			accessorKey: 'description',
			header: ({ column }) =>
				renderSnippet(DataTableHeader, {
					onclick: column.getToggleSortingHandler(),
					text: 'Description',
					filterOn: 'description'
				}),
			cell: ({ row }) => renderSnippet(DataTableText, { text: row.original.description })
		},
		{
			accessorKey: 'status',
			header: ({ column }) =>
				renderSnippet(DataTableHeader, {
					onclick: column.getToggleSortingHandler(),
					text: 'Status',
					filterOn: 'status'
				}),
			cell: ({ row }) => renderSnippet(DataTableText, { text: row.original.status })
		},
		{
			accessorKey: 'userCreatedBy',
			header: ({ column }) =>
				renderSnippet(DataTableHeader, {
					onclick: column.getToggleSortingHandler(),
					text: 'Who created?',
					filterOn: 'userCreatedBy'
				}),
			cell: ({ row }) => renderSnippet(DataTableText, { text: row.original.userCreatedBy })
		},
		{
			accessorKey: 'createdAt',
			header: ({ column }) =>
				renderSnippet(DataTableHeader, {
					onclick: column.getToggleSortingHandler(),
					text: 'When?',
					filterOn: 'createdAt'
				}),
			cell: ({ row }) => renderSnippet(DataTableText, { text: row.original.createdAt })
		},
		{
			accessorKey: 'domain',
			header: ({ column }) =>
				// renderComponent(LongDataTableHeaderSortable, {
				// 	onclick: column.getToggleSortingHandler(),
				// 	text: 'Domain'
				// }),
				renderSnippet(DataTableHeader, {
					onclick: column.getToggleSortingHandler(),
					text: 'Domain',
					filterOn: 'domain'
				}),
			cell: ({ row }) => renderSnippet(DataTableText, { text: row.original.domain })
		},
		// {
		// 	accessorKey: 'domain',
		// 	header: 'Domain',
		// 	cell: ({ row }) => renderComponent(DataTableReviewer, { row })
		// },
		{
			id: 'actions',
			cell: ({ row, table }) =>
				renderSnippet(DataTableActions, {
					id: row.original._id,
					isAdmin: isAdmin,
					IsSomePageRowsSelected: table.getIsSomePageRowsSelected(),
					IsAllPageRowsSelected: table.getIsAllPageRowsSelected()
				})
		}
	];
	const table = createSvelteTable({
		get data() {
			return items;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		getRowId: (row) => row._id.toString(),
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		}
	});

	function edit(id) {
		alert('edit ' + id);
	}
	function permanentdelete(id) {
		alert('permanentdelete ' + id);
	}
	function archive(id) {
		alert(id);
	}
	function pin(id) {
		alert(id);
	}
	function clone(id) {
		alert(id);
	}
	function softdelete(id) {
		alert(id);
	}
	function view(id) {
		console.log('id ' + id);
		alert(id);
	}
	function viewhistory(id) {
		alert(id);
	}
</script>

<Tabs.Root value="outline" class="w-full flex-col justify-start gap-6">
	<div class="flex items-center justify-between px-4 lg:px-6">
		<div class="flex items-center gap-2">
			<!-- <Button variant="outline" size="sm">
				<span class="hidden lg:inline"><LongDataTableAddNew /> </span>
			</Button> -->
			<LongDataTableAdd {form} {isAdmin} />
			{#if isAdmin}
				<Button variant="outline" size="sm">
					<span class="hidden lg:inline">Soft Delete All</span>
				</Button>
				<Button variant="outline" size="sm">
					<span class="hidden lg:inline">Delete All Permanently</span>
				</Button>
				<Button variant="outline" size="sm">
					<span class="hidden lg:inline">Archive All</span>
				</Button>
				<Button variant="outline" size="sm">
					<span class="hidden lg:inline">View Soft Deleted</span>
				</Button>
				<Button variant="outline" size="sm">
					<span class="hidden lg:inline">View Archived</span>
				</Button>
				<!-- TODO -->
				{#if table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()}
					<Button variant="outline" size="sm">
						<span class="hidden lg:inline">Soft Delete Selected</span>
					</Button>
					<Button variant="outline" size="sm">
						<span class="hidden lg:inline">Delete Selected Permanently</span>
					</Button>
					<Button variant="outline" size="sm">
						<span class="hidden lg:inline">Archive Selected</span>
					</Button>
				{/if}
			{/if}
		</div>
	</div>
	<Tabs.Content value="outline" class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
		<div class="overflow-hidden rounded-lg border">
			<DragDropProvider
				modifiers={[
					// @ts-expect-error @dnd-kit/abstract types are botched atm
					RestrictToVerticalAxis
				]}
				onDragEnd={(e) => (data = move(data, e))}
			>
				<Table.Root>
					<Table.Header class="sticky top-0 z-10 bg-muted">
						{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
							<Table.Row>
								{#each headerGroup.headers as header (header.id)}
									<Table.Head colspan={header.colSpan}>
										{#if !header.isPlaceholder}
											<FlexRender
												content={header.column.columnDef.header}
												context={header.getContext()}
											/>
										{/if}
									</Table.Head>
								{/each}
							</Table.Row>
						{/each}
					</Table.Header>
					<Table.Body class="**:data-[slot=table-cell]:first:w-8">
						{#if table.getRowModel().rows?.length}
							{#each table.getRowModel().rows as row, index (row.id)}
								{@render DraggableRow({ row, index })}
							{/each}
						{:else}
							<Table.Row>
								<Table.Cell colspan={columns.length} class="h-24 text-center">
									No results.
								</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>
			</DragDropProvider>
		</div>
		<div class="flex items-center justify-between px-4">
			<div class="hidden flex-1 text-sm text-muted-foreground lg:flex">
				{table.getFilteredSelectedRowModel().rows.length} of
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div class="flex w-full items-center gap-8 lg:w-fit">
				<div class="hidden items-center gap-2 lg:flex">
					<Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
					<Select.Root
						type="single"
						bind:value={
							() => `${table.getState().pagination.pageSize}`, (v) => table.setPageSize(Number(v))
						}
					>
						<Select.Trigger size="sm" class="w-20" id="rows-per-page">
							{table.getState().pagination.pageSize}
						</Select.Trigger>
						<Select.Content side="top">
							{#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
								<Select.Item value={pageSize.toString()}>
									{pageSize}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex w-fit items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of
					{table.getPageCount()}
				</div>
				<div class="ms-auto flex items-center gap-2 lg:ms-0">
					<Button
						variant="outline"
						class="hidden h-8 w-8 p-0 lg:flex"
						onclick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span class="sr-only">Go to first page</span>
						<ChevronsLeftIcon />
					</Button>
					<Button
						variant="outline"
						class="size-8"
						size="icon"
						onclick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span class="sr-only">Go to previous page</span>
						<ChevronLeftIcon />
					</Button>
					<Button
						variant="outline"
						class="size-8"
						size="icon"
						onclick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span class="sr-only">Go to next page</span>
						<ChevronRightIcon />
					</Button>
					<Button
						variant="outline"
						class="hidden size-8 lg:flex"
						size="icon"
						onclick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span class="sr-only">Go to last page</span>
						<ChevronsRightIcon />
					</Button>
				</div>
			</div>
		</div>
	</Tabs.Content>
</Tabs.Root>

{#snippet DataTableLimit({ row }: { row: Row<LongSchema> })}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
				loading: `Saving ${row.original.header}`,
				success: 'Done',
				error: 'Error'
			});
		}}
	>
		<Label for="{row.original.id}-limit" class="sr-only">Limit</Label>
		<Input
			class="h-8 w-16 border-transparent bg-transparent text-end shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
			value={row.original.limit}
			id="{row.original.id}-limit"
		/>
	</form>
{/snippet}

{#snippet DataTableStatus({ row }: { row: Row<LongSchema> })}
	<Badge variant="outline" class="px-1.5 text-muted-foreground">
		{#if row.original.status === 'Done'}
			<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
		{:else}
			<LoaderIcon />
		{/if}
		{row.original.status}
	</Badge>
{/snippet}
{#snippet DataTableActions({ id, isAdmin, IsSomePageRowsSelected, IsAllPageRowsSelected })}
	{#if !IsSomePageRowsSelected && !IsAllPageRowsSelected}
		<LongDataTableView {id} {isAdmin} />
		<LongDataTableEdit {form} {id} {isAdmin} />
		{#if isAdmin}
			<form action="?/permanentDeleteLongVideo" method="POST" use:enhance>
				<input type="hidden" name="_id" value={id} />
				<Button variant="outline" type="submit">PD</Button>
			</form>
		{/if}
	{/if}
	<!-- <DropdownMenu.Root>
		<DropdownMenu.Trigger class="flex size-8 text-muted-foreground data-[state=open]:bg-muted">
			{#snippet child({ props })}
				<Button variant="ghost" size="icon" {...props}>
					<DotsVerticalIcon />
					<span class="sr-only">Open menu</span>
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		{#if !IsSomePageRowsSelected && !IsAllPageRowsSelected}
			<DropdownMenu.Content align="end" class="w-36">
				<DropdownMenu.Item><button onclick={view(id)}>View</button></DropdownMenu.Item>
				<DropdownMenu.Item><LongDataTableEdit {form} {refreshLongDataTable} {id}/></DropdownMenu.Item>
				<DropdownMenu.Item><button onclick={clone(id)}>Clone</button></DropdownMenu.Item>
				<DropdownMenu.Item><button onclick={pin(id)}>Pin</button></DropdownMenu.Item>
				<DropdownMenu.Item
					><button onclick={viewhistory(id)}>View History</button></DropdownMenu.Item
				>
				<DropdownMenu.Item variant="destructive"
					><button onclick={softdelete(id)}>Delete</button></DropdownMenu.Item
				>
				{#if isAdmin}
					<DropdownMenu.Separator />
					<DropdownMenu.Item><button onclick={archive(id)}>Archive</button></DropdownMenu.Item>
					<DropdownMenu.Item variant="destructive"
						><button onclick={permanentdelete(id)}>Permanent Delete</button></DropdownMenu.Item
					>
				{/if}
			</DropdownMenu.Content>
		{/if}
	</DropdownMenu.Root> -->
{/snippet}

{#snippet DraggableRow({ row, index }: { row: Row<LongSchema>; index: number })}
	{@const { ref, isDragging, handleRef } = useSortable({
		id: row.original.id,
		index: () => index
	})}

	<Table.Row
		data-state={row.getIsSelected() && 'selected'}
		data-dragging={isDragging.current}
		class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
		{@attach ref}
	>
		{#each row.getVisibleCells() as cell (cell.id)}
			<Table.Cell>
				<FlexRender
					attach={handleRef}
					content={cell.column.columnDef.cell}
					context={cell.getContext()}
				/>
			</Table.Cell>
		{/each}
	</Table.Row>
{/snippet}

{#snippet DataTableText({ text }: { row: Row<LongSchema> })}
	<div class="truncate-text">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>{text}</Tooltip.Trigger>
				<Tooltip.Content>
					{text}
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
{/snippet}

{#snippet DataTableHeader({ text, onclick, filterOn }: { row: Row<LongSchema> })}
	<div>
		<Button {onclick} variant="ghost" class="cursor-pointer">
			{text}
			<ArrowUpDownIcon />
		</Button>
	</div>
	<div>
		<Input
			placeholder="Filter {text}"
			value={table.getColumn(filterOn)?.getFilterValue() as string}
			onchange={(e) => table.getColumn(filterOn)?.setFilterValue(e.currentTarget.value)}
			oninput={(e) => table.getColumn(filterOn)?.setFilterValue(e.currentTarget.value)}
		/>
	</div>
{/snippet}

<style>
	.truncate-text {
		white-space: nowrap; /* Forces text to a single line */
		overflow: hidden;
		text-overflow: ellipsis; /* Appends ellipsis to overflowed text */
		width: 200px; /* Requires a defined width */
		display: block;
	}
</style>
