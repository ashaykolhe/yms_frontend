<script lang="ts">
	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';
	let { data, form } = $props();
	let isAdmin = data.isAdmin;
	// let items = data.longVideos;
	let username = data.username;
	let useremail = data.useremail;
	// export let { isAdmin, items, username, useremail } = $props();
	console.log('name:- ' + username);
	console.log('useremail:- ' + useremail);
	let message = $state('');
	// $inspect(data);
	// $inspect(form);
	// $inspect(message);
	// console.log('isAdmin:- ' + isAdmin);
	// console.log(items);

	import customdata from './customdata.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SectionCards from '$lib/components/section-cards.svelte';
	import ChartAreaInteractive from '$lib/components/chart-area-interactive.svelte';
	import LongDataTable from '$lib/components/long-data-table.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import PopcornIcon from '@lucide/svelte/icons/popcorn';
	import { getContext, onMount, setContext } from 'svelte';
	let channelId = $state('');
	function setChannelId(channelIdIn) {
		channelId = channelIdIn;
		console.log('setChannelId ' + channelId);
	}

	let promise = $state(fetchData());
	async function fetchData() {
		if (channelId) {
			console.log('fetchData ' + channelId);
			const response = await fetch(`/long?type=A&channelId=${channelId}`, {
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

	function refreshLongDataTable() {
		promise = fetchData();
	}

	$effect(() => {
		console.log('effect ' + channelId);
		setContext('channelId', channelId);
		refreshLongDataTable();
		// setContext('form', form);
	});

	$effect(() => {
		if (form?.success) {
			refreshLongDataTable();
		}
		message = form?.message;
		setTimeout(() => {
			message = '';
		}, 2000);
	});
</script>

<SiteHeader page="Long" callback={setChannelId} />
{#if form?.success && message?.length > 0}
	<div class="grid w-full max-w-xl items-start gap-4" transition:slide>
		<Alert.Root variant="destructive">
			<!-- <CheckCircle2Icon /> -->
			<Alert.Title>{message}</Alert.Title>
			<!-- <Alert.Description>This is an alert with icon, title and description.</Alert.Description> -->
		</Alert.Root>
	</div>
{/if}
{#await promise}
	<div>Loading...</div>
{:then items}
	<!-- {#if items.length > 0} -->
	<div class="flex flex-1 flex-col">
		<div class="@container/main flex flex-1 flex-col gap-2">
			<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				<!-- <DataTable {customdata} /> -->
				<!-- {#each items as item} -->
				<!-- {item} -->
				<!-- {/each} -->
				<LongDataTable {items} {isAdmin} {form} />
			</div>
		</div>
	</div>
	<!-- {/if} -->
{/await}
