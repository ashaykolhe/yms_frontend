<script lang="ts">
	import CameraIcon from '@tabler/icons-svelte/icons/camera';
	import ChartBarIcon from '@tabler/icons-svelte/icons/chart-bar';
	import DashboardIcon from '@tabler/icons-svelte/icons/dashboard';
	import DatabaseIcon from '@tabler/icons-svelte/icons/database';
	import FileAiIcon from '@tabler/icons-svelte/icons/file-ai';
	import FileDescriptionIcon from '@tabler/icons-svelte/icons/file-description';
	import FileWordIcon from '@tabler/icons-svelte/icons/file-word';
	import FolderIcon from '@tabler/icons-svelte/icons/folder';
	import HelpIcon from '@tabler/icons-svelte/icons/help';
	import InnerShadowTopIcon from '@tabler/icons-svelte/icons/inner-shadow-top';
	import ListDetailsIcon from '@tabler/icons-svelte/icons/list-details';
	import ReportIcon from '@tabler/icons-svelte/icons/report';
	import SearchIcon from '@tabler/icons-svelte/icons/search';
	import SettingsIcon from '@tabler/icons-svelte/icons/settings';
	import UsersIcon from '@tabler/icons-svelte/icons/users';
	import NavDocuments from './nav-documents.svelte';
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let { username, useremail, ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
	console.log('username: ' + username);
	const data = {
		user: {
			name: username,
			email: useremail
			// avatar: '/avatars/shadcn.jpg'
		},
		navMainReal: [
			{
				url: '/long',
				title: 'Long',
				icon: DashboardIcon
			},
			{
				url: '/short',
				title: 'Short',
				icon: DashboardIcon
			},
			{
				url: '/domain',
				title: 'Domain',
				icon: DashboardIcon
			},
			{
				url: '/videostatus',
				title: 'Video Status',
				icon: DashboardIcon
			},
			{
				url: '/user',
				title: 'User',
				icon: DashboardIcon
			},
			{
				url: '/idea',
				title: 'Idea',
				icon: DashboardIcon
			},
			{
				url: '/channel',
				title: 'Channel',
				icon: DashboardIcon
			}
		],
		navMain: [
			{
				title: 'Dashboard',
				url: '#',
				icon: DashboardIcon
			},
			{
				title: 'Lifecycle',
				url: '#',
				icon: ListDetailsIcon
			},
			{
				title: 'Analytics',
				url: '#',
				icon: ChartBarIcon
			},
			{
				title: 'Projects',
				url: '#',
				icon: FolderIcon
			},
			{
				title: 'Team',
				url: '#',
				icon: UsersIcon
			}
		]
		// navClouds: [
		// 	{
		// 		title: 'Capture',
		// 		icon: CameraIcon,
		// 		isActive: true,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#'
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		title: 'Proposal',
		// 		icon: FileDescriptionIcon,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#'
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		title: 'Prompts',
		// 		icon: FileAiIcon,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#'
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#'
		// 			}
		// 		]
		// 	}
		// ],
		// navSecondary: [
		// 	{
		// 		title: 'Settings',
		// 		url: '#',
		// 		icon: SettingsIcon
		// 	},
		// 	{
		// 		title: 'Get Help',
		// 		url: '#',
		// 		icon: HelpIcon
		// 	},
		// 	{
		// 		title: 'Search',
		// 		url: '#',
		// 		icon: SearchIcon
		// 	}
		// ],
		// documents: [
		// 	{
		// 		name: 'Data Library',
		// 		url: '#',
		// 		icon: DatabaseIcon
		// 	},
		// 	{
		// 		name: 'Reports',
		// 		url: '#',
		// 		icon: ReportIcon
		// 	},
		// 	{
		// 		name: 'Word Assistant',
		// 		url: '#',
		// 		icon: FileWordIcon
		// 	}
		// ]
	};
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<!-- <Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<InnerShadowTopIcon class="!size-5" />
							<span class="text-base font-semibold">Youtube Management System</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header> -->
	<Sidebar.Content class="mt-5">
		<NavMain items={data.navMainReal} />
		<!-- <NavDocuments items={data.documents} /> -->
		<!-- <NavSecondary items={data.navSecondary} class="mt-auto" /> -->
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
