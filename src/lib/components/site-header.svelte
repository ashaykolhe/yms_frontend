<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as NativeSelect from '$lib/components/ui/native-select/index.js';

	let { page, callback } = $props();

	import { getContext, setContext } from 'svelte';

	const channels = getContext('channels');
	function handleChange(e) {
		console.log('handleChange ' + e.target.value);
		callback(e.target.value);
	}
</script>

<header
	class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ms-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<span class="text-base font-semibold">{page}</span>
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<span>
			<NativeSelect.Root onchange={handleChange}>
				<NativeSelect.Option value="">Select status</NativeSelect.Option>
				{#each channels as channel (channel._id)}
					<NativeSelect.Option value={channel._id}>
						{channel.title}
					</NativeSelect.Option>
				{/each}
			</NativeSelect.Root>
		</span>
		<!-- <span>
			<Select.Root type="single" name="channels" bind:value>
				<Select.Trigger class="w-[180px]">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Channels</Select.Label>
						{#each channels as channel (channel._id)}
							<Select.Item value={channel._id} label={channel.title}>
								{channel.title}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</span> -->
		<!-- <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
						{#snippet child({ props })}
							<a href="##" {...props}>
								<InnerShadowTopIcon class="!size-5" />
								<span class="text-base font-semibold">{page}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header> -->
	</div>
</header>
