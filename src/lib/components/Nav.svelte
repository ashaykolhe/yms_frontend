<script lang="ts">
	import { page } from '$app/stores';

	// export let logged_in = false;
	export let isAdmin;

	type link = {
		path: string;
		text: string;
	};

	const links: link[] = [
		{
			path: '/long',
			text: 'Long'
		},
		{
			path: '/short',
			text: 'Short'
		},
		{
			path: '/domain',
			text: 'Domain'
		},
		{
			path: '/videostatus',
			text: 'Video Status'
		},
		{
			path: '/user',
			text: 'User'
		},
		{
			path: '/idea',
			text: 'Idea'
		},
		{
			path: '/channel',
			text: 'Channel'
		}
	];
</script>

<!-- {isAdmin} -->
<nav>
	<ul>
		{#each links as link}
			<li>
				<a href={link.path}>
					{link.text}
				</a>
			</li>
		{/each}
		<li>
			<form action="/logout" method="POST" class="logout-form">
				<button>Logout</button>
			</form>
		</li>
	</ul>
</nav>
