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
	import Checkbox from './ui/checkbox/checkbox.svelte';
	let bindtitle = $state('titledescriptionkeywords');
	console.log('getContext(channelId) ' + getContext('channelId'));
	let channelId = $state(getContext('channelId'));
	let isOpen = $state(false);
	let { form, refreshLongDataTable, isAdmin } = $props();
	$inspect(form);
	let message = $state('');
	let returndata = $state('');
	function handleSubmit() {
		setTimeout(() => {
			if (form?.error) {
				message = form?.message;
				returndata = form?.returndata;
				isOpen = true;
			} else {
				closeDialog();
			}
		}, 100);
		setTimeout(() => {
			message = '';
		}, 2000);
	}

	function closeDialog() {
		isOpen = false;
		message = '';
		returndata = '';
		console.log('isOpen ' + isOpen);
		refreshLongDataTable(channelId);
	}

	function handleDomainChange(e) {
		console.log('handleDomainChange ' + e.target.value);
		// callback(e.target.value);
	}

	// <!-- TODO - DOMAIN should come from MONGO  -->
	const domains = [
		{
			_id: 1,
			title: 'PHILOSOPHY'
		},
		{
			_id: 2,
			title: 'SCIENCE'
		},
		{
			_id: 3,
			title: 'MYTHOLOGY'
		}
	];

	function handleStatusChange(e) {
		console.log(e.target.value);
	}

	// TODO - should come from DB
	const statuses = [
		{
			_id: 1,
			title: 'NEXT'
		},
		{
			_id: 2,
			title: 'AUDIO'
		},
		{
			_id: 3,
			title: 'SRT'
		},
		{
			_id: 4,
			title: 'BACKGROUND VISUALS'
		},
		{
			_id: 5,
			title: 'DOWNLOAD VIDEO'
		},
		{
			_id: 6,
			title: 'PREMIERE PRO'
		},
		{
			_id: 7,
			title: 'PREMIERE PRO SHORT'
		},
		{
			_id: 8,
			title: 'READY'
		},
		{
			_id: 9,
			title: 'UPLOADING'
		},
		{
			_id: 10,
			title: 'METADATA PENDING'
		},
		{
			_id: 11,
			title: 'UPLOADED'
		},
		{
			_id: 12,
			title: 'PUBLISHED'
		}
	];
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add</Dialog.Trigger>

	<Dialog.Content class="min-w-400">
		<form action="?/addNewLongVideo" method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Add New</Dialog.Title>
				<Dialog.Description>Add New Long Video</Dialog.Description>
			</Dialog.Header>

			<div class="-mb-4 flex min-h-180 flex-col gap-6">
				<Tabs.Root bind:value={bindtitle}>
					<Tabs.List>
						<Tabs.Trigger value="titledescriptionkeywords">Title & Description</Tabs.Trigger>
						<Tabs.Trigger value="backgroundVisuals">Background Visuals</Tabs.Trigger>
						<Tabs.Trigger value="video">Video</Tabs.Trigger>
						<Tabs.Trigger value="speechToText">Speech to Text</Tabs.Trigger>
						<Tabs.Trigger value="metadata"
							>Metadata(other titles, descriptions, keywords)</Tabs.Trigger
						>
						<Tabs.Trigger value="backgroundmusic">Background Music</Tabs.Trigger>
						<Tabs.Trigger value="others">Others</Tabs.Trigger>
					</Tabs.List>

					<Tabs.Content value="titledescriptionkeywords">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add title here"
								id="title"
								name="title"
								class="min-h-30"
								value={returndata?.title ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<Textarea
								placeholder="Add description here"
								id="description"
								name="description"
								class="min-h-80"
								value={returndata?.description ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<Textarea
								placeholder="Add keywords here"
								id="keywords"
								name="keywords"
								class="min-h-30"
								value={returndata?.keywords ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<NativeSelect.Root class="w-390" name="domain" onchange={handleDomainChange}>
								<NativeSelect.Option value="">Select domain</NativeSelect.Option>
								{#each domains as domain (domain._id)}
									<NativeSelect.Option value={domain.title}>
										{domain.title}
									</NativeSelect.Option>
								{/each}
							</NativeSelect.Root>
						</div>
						<div class="grid gap-3">
							<NativeSelect.Root class="w-390" name="status" onchange={handleStatusChange}>
								<NativeSelect.Option value="">Select status</NativeSelect.Option>
								{#each statuses as status (status._id)}
									<NativeSelect.Option value={status.title}>
										{status.title}
									</NativeSelect.Option>
								{/each}
							</NativeSelect.Root>
						</div>
						<input type="hidden" name="channelId" bind:value={channelId} />
						<input type="hidden" name="type" value="long" />
					</Tabs.Content>
					<Tabs.Content value="backgroundVisuals">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add background visuals prompt here"
								id="backgroundVisualsPrompt"
								name="backgroundVisualsPrompt"
								class="min-h-30"
								value={returndata?.backgroundVisualsPrompt ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<Textarea
								placeholder="Add background visuals here"
								id="backgroundVisuals"
								name="backgroundVisuals"
								class="min-h-130"
								value={returndata?.backgroundVisuals ?? ''}
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="video">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add video prompt here"
								id="videoPrompt"
								name="videoPrompt"
								class="min-h-30"
								value={returndata?.videoPrompt ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<Textarea
								placeholder="Add video text here"
								id="videoText"
								name="videoText"
								class="min-h-130"
								value={returndata?.videoText ?? ''}
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="speechToText">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add Speech to Text here"
								id="speechToTextOutput"
								name="speechToTextOutput"
								class="min-h-80"
								value={returndata?.speechToTextOutput ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<Textarea
								placeholder="Add SRT here"
								id="srt"
								name="srt"
								class="min-h-80"
								value={returndata?.srt ?? ''}
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="metadata">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add metadata here"
								id="metadata"
								name="metadata"
								class="min-h-160"
								value={returndata?.metadata ?? ''}
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="backgroundmusic">
						<div class="grid gap-3">
							<Textarea
								placeholder="Add background music prompt here"
								id="backgroundMusicPrompt"
								name="backgroundMusicPrompt"
								class="min-h-30"
								value={returndata?.backgroundMusicPrompt ?? ''}
							/>
						</div>
						<div class="grid gap-3">
							<Textarea
								placeholder="Add background music here"
								id="backgroundMusic"
								name="backgroundMusic"
								class="min-h-130"
								value={returndata?.backgroundMusic ?? ''}
							/>
						</div>
					</Tabs.Content>
					<Tabs.Content value="others">
						{#if isAdmin}
							<div class="grid gap-3">
								<Label
									class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
								>
									<Checkbox
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

						<div class="grid gap-3">
							<Textarea
								placeholder="Add thumbnail prompt here"
								id="thumbnailPrompt"
								name="thumbnailPrompt"
								class="min-h-140"
								value={returndata?.thumbnailPrompt ?? ''}
							/>
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</div>
			{#if form?.error && message?.length > 0}
				<Alert.Root variant="destructive">
					<PopcornIcon />
					<Alert.Title>{message}</Alert.Title>
				</Alert.Root>
			{/if}
			<Dialog.Footer>
				<!-- <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close> -->
				<Button onclick={closeDialog}>Cancel</Button>
				<Button type="submit" onclick={handleSubmit}>Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
