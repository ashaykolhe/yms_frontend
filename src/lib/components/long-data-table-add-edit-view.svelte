<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from './ui/textarea/textarea.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	let bindtitle = $state('title');
	console.log('getContext(channelId) ' + getContext('channelId'));
	let channelId = $state(getContext('channelId'));
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add New</Dialog.Trigger>

	<Dialog.Content class="min-w-400">
		<form action="?/addNewLongVideo" method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Add New</Dialog.Title>
				<Dialog.Description>Add New Long Video</Dialog.Description>
			</Dialog.Header>

			<div class="-mb-4 flex min-h-180 flex-col gap-6">
				<Tabs.Root bind:value={bindtitle}>
					<Tabs.List>
						<Tabs.Trigger value="title">Title</Tabs.Trigger>
						<Tabs.Trigger value="description">Description</Tabs.Trigger>
					</Tabs.List>

					<Tabs.Content value="title">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add title here"
								id="title"
								name="title"
								class="min-h-160"
								required
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="description">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add description here"
								id="description"
								name="description"
								class="min-h-160"
							/>
						</div>
						<input type="hidden" name="channelId" bind:value={channelId} />
					</Tabs.Content>
				</Tabs.Root>
			</div>
			<Dialog.Footer>
				<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
