<script lang="ts">
	let { data } = $props();
	let isAdmin = data.isAdmin;
	let items = data.shortVideos;
	let username = data.username;
	let useremail = data.useremail;
	// export let { isAdmin, items, username, useremail } = $props();
	console.log('name:- ' + username);
	console.log('useremail:- ' + useremail);
	console.log('isAdmin:- ' + isAdmin);

	import customdata from './customdata.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SectionCards from '$lib/components/section-cards.svelte';
	import ChartAreaInteractive from '$lib/components/chart-area-interactive.svelte';
	import DataTable from '$lib/components/data-table.svelte';
</script>

<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<DataTable {customdata} />
		</div>
	</div>
</div>
