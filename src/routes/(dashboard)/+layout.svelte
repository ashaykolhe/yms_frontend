<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NewNav from '$lib/components/NewNav.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { getContext, setContext } from 'svelte';
	let { data } = $props();
	let isAdmin = data.isAdmin;
	// let items = data.longVideos;
	let username = data.username;
	let useremail = data.useremail;
	let pathname = data.pathname;
	// export let { isAdmin, items, username, useremail } = $props();
	console.log('name:- ' + username);
	console.log('useremail:- ' + useremail);
	// console.log('isAdmin:- ' + isAdmin);
	let channels = data.channels;
	setContext('channels', channels);
</script>

<!-- <NewNav /> -->
<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 45); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="inset" {username} {useremail} />
	<Sidebar.Inset>
		<!-- {#if d} -->
		<slot />
		<!-- {/if} -->
	</Sidebar.Inset>
</Sidebar.Provider>
