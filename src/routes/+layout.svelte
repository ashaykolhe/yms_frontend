<script lang="ts">
	import './layout.css';
	import '$lib/css/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import NewNav from '$lib/components/NewNav.svelte';

	let { children, data } = $props();
	let isAdmin = data.isAdmin;
</script>

<!-- <Nav {isAdmin} /> -->
<!-- <NewNav /> -->
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
