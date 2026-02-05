<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from './ui/textarea/textarea.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import PopcornIcon from '@lucide/svelte/icons/popcorn';
	import * as NativeSelect from '$lib/components/ui/native-select/index.js';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	let channelId = $state(getContext('channelId'));
	import Checkbox from './ui/checkbox/checkbox.svelte';
	let bindtitle = $state('titledescription');
	console.log('getContext(channelId) ' + getContext('channelId'));
	let isOpen = $state(false);
	let { id, isAdmin } = $props();
	let returndata = $state('');

	function closeDialog() {
		isOpen = false;
		returndata = '';
	}

	async function fetchData() {
		const response = await fetch(`/domain?type=E&id=${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		returndata = await response.json();
	}

	$effect(() => {
		fetchData();
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>V</Dialog.Trigger>

	<Dialog.Content class="min-w-400">
		<Dialog.Header>
			<Dialog.Title>View</Dialog.Title>
			<Dialog.Description>View Domain</Dialog.Description>
		</Dialog.Header>

		<div class="-mb-4 flex min-h-180 flex-col gap-6">
			<Tabs.Root bind:value={bindtitle}>
				<Tabs.List>
					<Tabs.Trigger value="titledescription">Title, Description</Tabs.Trigger>
					<Tabs.Trigger value="others">Others</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="titledescription">
					<div class="grid gap-3">
						<Textarea
							placeholder="Add title here"
							id="title"
							name="title"
							class="min-h-30"
							value={returndata?.title ?? ''}
							disabled
						/>
					</div>
					<div class="grid gap-3">
						<Textarea
							placeholder="Add description here"
							id="description"
							name="description"
							class="min-h-80"
							value={returndata?.description ?? ''}
							disabled
						/>
					</div>
					<input type="hidden" name="_id" bind:value={id} />
				</Tabs.Content>
				<Tabs.Content value="others">
					{#if isAdmin}
						<div class="grid gap-3">
							<Label
								class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
							>
								<Checkbox
									checked={returndata?.archived ?? false}
									disabled
									id="toggle-2"
									name="archived"
									class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div class="grid gap-1.5 font-normal">
									<p class="text-sm leading-none font-medium">Archive</p>
								</div>
							</Label>
						</div>
						<div class="grid gap-3">
							<Label
								class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
							>
								<Checkbox
									checked={returndata?.softDelete ?? false}
									disabled
									id="toggle-2"
									name="softDelete"
									class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
								/>
								<div class="grid gap-1.5 font-normal">
									<p class="text-sm leading-none font-medium">Delete</p>
									<!-- <p class="text-sm text-muted-foreground">
										You can enable or disable notifications at any time.
									</p> -->
								</div>
							</Label>
						</div>
					{/if}
				</Tabs.Content>
			</Tabs.Root>
		</div>
		<Dialog.Footer>
			<!-- <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close> -->
			<Button onclick={closeDialog}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
