<script>
	import { enhance } from '$app/forms';
	// import { page } from '$app/state';
	let { data, form } = $props();
	import { Input, Label, Button, Checkbox, A } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<!-- <div>
	{data.user}
</div> -->
<form method="POST" use:enhance autocomplete="off" action="?/login">
	<div class="mb-6 grid gap-6 md:grid-cols-2">
		<div class="mb-6">
			<Label for="email" class="mb-2">Email address</Label>
			<Input clearable type="email" id="email" required value={form?.email ?? ''} name="email" />
		</div>
		<div class="mb-6">
			<Label for="password" class="mb-2">Password</Label>
			<Input type="password" id="password" required name="password" />
		</div>
	</div>
	<Button type="submit">Submit</Button>
</form>
<div>
	{#if form?.message}<p class="error">{form?.message}</p>{/if}
</div>
