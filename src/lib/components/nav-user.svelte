<script lang="ts">
	import CreditCardIcon from '@tabler/icons-svelte/icons/credit-card';
	import DotsVerticalIcon from '@tabler/icons-svelte/icons/dots-vertical';
	import LogoutIcon from '@tabler/icons-svelte/icons/logout';
	import NotificationIcon from '@tabler/icons-svelte/icons/notification';
	import UserCircleIcon from '@tabler/icons-svelte/icons/user-circle';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { onMount } from 'svelte';
	import LogoutDialog from './logout-dialog.svelte';
	import { enhance } from '$app/forms';
	let formElement: HTMLFormElement;
	let { user }: { user: { name: string; email: string; avatar: string } } = $props();

	const sidebar = Sidebar.useSidebar();

	let date = $state(new Date());
	let hour = $derived.by(() => {
		let h = date.getHours();
		return h <= 9 ? '0' + h : h;
	});
	let min = $derived.by(() => {
		let m = date.getMinutes();
		return m <= 9 ? '0' + m : m;
	});

	let sec = $derived.by(() => {
		let s = date.getSeconds();
		return s <= 9 ? '0' + s : s;
	});
	// let dayOrNight = 'AM';

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
			// dayOrNight = hour >= 12 ? 'PM' : 'AM';
		}, 1000);
		// return clearInterval(interval);
	});

	function logout() {
		if (formElement) {
			formElement.requestSubmit();
		}
	}
</script>

<form action="/logout" method="POST" use:enhance bind:this={formElement}></form>
<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="xlg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<!-- <Avatar.Root class="size-8 rounded-lg grayscale">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root> -->
						<div class="grid flex-1 text-start text-sm leading-tight">
							<!-- <span>Youtube Management System</span> -->
							<span class="truncate font-medium">{user.name}</span>
							<span class="truncate text-xs text-muted-foreground">
								{user.email}
							</span>
							<!-- <span>{hour} : {min} : {sec} {dayOrNight}</span> -->
							<span>{hour} : {min} : {sec}</span>
							<LogoutDialog callback={logout} />
						</div>
						<!-- <DotsVerticalIcon class="ms-auto size-4" /> -->
						<!-- <LogoutIcon /> -->
						<!-- <form action="/logout" method="POST" class="logout-form"> -->
						<!-- <button class="cursor-pointer">Logout</button> -->
						<!-- </form> -->
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
