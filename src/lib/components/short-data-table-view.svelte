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
	let isOpen = $state(false);
	let { id, isAdmin } = $props();
	let returndata = $state('');

	function closeDialog() {
		isOpen = false;
		returndata = '';
	}

	let domains;
	let statuses;
	// <!-- TODO - DOMAIN should come from MONGO  -->
	async function fetchDomainStatus() {
		if (channelId) {
			console.log('fetchData ' + channelId);
			let response = await fetch(`/status?type=A&channelId=${channelId}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});

			statuses = await response.json();

			console.log('fetchData ' + channelId);
			response = await fetch(`/domain?type=A&channelId=${channelId}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});

			domains = await response.json();
		}

		return [];
	}
	async function fetchData() {
		const response = await fetch(`/short?type=E&id=${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		returndata = await response.json();
	}

	$effect(() => {
		fetchData();
		fetchDomainStatus();
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>V</Dialog.Trigger>

	<Dialog.Content class="min-w-400">
		<Dialog.Header>
			<Dialog.Title>View</Dialog.Title>
			<Dialog.Description>View Short Video</Dialog.Description>
		</Dialog.Header>

		<div class="-mb-4 flex min-h-180 flex-col gap-6">
			<Tabs.Root bind:value={bindtitle}>
				<Tabs.List>
					<Tabs.Trigger value="titledescriptionkeywords">Title, Description & Keywords</Tabs.Trigger
					>
					<Tabs.Trigger value="audio">Audio Prompt</Tabs.Trigger>
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
					<div class="grid gap-3">
						<Textarea
							placeholder="Add keywords here"
							id="keywords"
							name="keywords"
							class="min-h-30"
							value={returndata?.keywords ?? ''}
							disabled
						/>
					</div>
					<div class="grid gap-3">
						<NativeSelect.Root
							class="w-390"
							name="domain"
							value={returndata?.domain ?? ''}
							disabled
						>
							<NativeSelect.Option value="">Select domain</NativeSelect.Option>
							{#each domains as domain (domain._id)}
								<NativeSelect.Option value={domain.title}>
									{domain.title}
								</NativeSelect.Option>
							{/each}
						</NativeSelect.Root>
					</div>
					<div class="grid gap-3">
						<NativeSelect.Root
							class="w-390"
							name="status"
							value={returndata?.status ?? ''}
							disabled
						>
							<NativeSelect.Option value="">Select status</NativeSelect.Option>
							{#each statuses as status (status._id)}
								<NativeSelect.Option value={status.title}>
									{status.title}
								</NativeSelect.Option>
							{/each}
						</NativeSelect.Root>
					</div>
					<input type="hidden" name="_id" bind:value={id} />
				</Tabs.Content>
				<Tabs.Content value="audio">
					<div class="grid gap-3">
						<Textarea
							placeholder="Add audio prompt here"
							id="audioPrompt"
							name="audioPrompt"
							class="min-h-160"
							value={returndata?.audioPrompt ?? ''}
						/>
					</div>
				</Tabs.Content>
				<Tabs.Content value="backgroundVisuals">
					<div class="grid gap-3">
						<Textarea
							placeholder="Add background visuals prompt here"
							id="backgroundVisualsPrompt"
							name="backgroundVisualsPrompt"
							class="min-h-30"
							value={returndata?.backgroundVisualsPrompt ?? ''}
							disabled
						/>
					</div>
					<div class="grid gap-3">
						<Textarea
							placeholder="Add background visuals here"
							id="backgroundVisuals"
							name="backgroundVisuals"
							class="min-h-130"
							value={returndata?.backgroundVisuals ?? ''}
							disabled
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
							disabled
						/>
					</div>
					<div class="grid gap-3">
						<Textarea
							placeholder="Add video text here"
							id="videoText"
							name="videoText"
							class="min-h-130"
							value={returndata?.videoText ?? ''}
							disabled
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
							disabled
						/>
					</div>
					<div class="grid gap-3">
						<Textarea
							placeholder="Add SRT here"
							id="srt"
							name="srt"
							class="min-h-80"
							value={returndata?.srt ?? ''}
							disabled
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
							disabled
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
							disabled
						/>
					</div>
					<div class="grid gap-3">
						<Textarea
							placeholder="Add background music here"
							id="backgroundMusic"
							name="backgroundMusic"
							class="min-h-130"
							value={returndata?.backgroundMusic ?? ''}
							disabled
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

					<div class="grid gap-3">
						<Textarea
							placeholder="Add thumbnail prompt here"
							id="thumbnailPrompt"
							name="thumbnailPrompt"
							class="min-h-140"
							value={returndata?.thumbnailPrompt ?? ''}
							disabled
						/>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>
		<Dialog.Footer>
			<!-- <Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close> -->
			<Button onclick={closeDialog}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
