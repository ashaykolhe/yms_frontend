<script>
	import { enhance } from '$app/forms';
	import LoginForm from '$lib/components/login-form.svelte';
	// import { page } from '$app/state';
	let { form } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center px-4">
	<LoginForm error={form?.message} />
</div>
