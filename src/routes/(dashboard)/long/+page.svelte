<script lang="ts">
	let { data } = $props();
	let isAdmin = data.isAdmin;
	// let items = data.longVideos;
	let username = data.username;
	let useremail = data.useremail;
	// export let { isAdmin, items, username, useremail } = $props();
	console.log('name:- ' + username);
	console.log('useremail:- ' + useremail);
	// console.log('isAdmin:- ' + isAdmin);
	// console.log(items);

	import customdata from './customdata.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SectionCards from '$lib/components/section-cards.svelte';
	import ChartAreaInteractive from '$lib/components/chart-area-interactive.svelte';
	import DataTable from '$lib/components/long-data-table.svelte';
	import { getContext, onMount, setContext } from 'svelte';
	let channelId = $state.raw('');
	function setChannelId(channelIdIn) {
		channelId = channelIdIn;
		console.log('setChannelId ' + channelId);
	}
	let promise = $state(fetchData(''));
	async function fetchData(channelIdFetch) {
		if (channelId) {
			console.log('fetchData ' + channelIdFetch);
			const response = await fetch(`/long/${channelIdFetch}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});

			const items = await response.json();
			return items;
		}
		return [];
	}

	$effect(() => {
		console.log('effect ' + channelId);
		setContext('channelId', channelId);
		promise = fetchData(channelId);
	});
</script>

<SiteHeader page="Long" callback={setChannelId} />
{#await promise}
	<div>Loading...</div>
{:then items}
	{#if items.length > 0}
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<!-- <DataTable {customdata} /> -->
					<!-- {#each items as item} -->
					<!-- {item} -->
					<!-- {/each} -->
					<DataTable {items} {isAdmin} />
				</div>
			</div>
		</div>
	{/if}
{/await}
