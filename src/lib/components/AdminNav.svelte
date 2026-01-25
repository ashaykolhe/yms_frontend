<script lang="ts">
	import { page } from '$app/stores';

	export let logged_in = false;

	type link = {
		path: string;
		text: string;
		protected: boolean;
	};

	const links: link[] = [
		{
			path: '/dashboard',
			text: 'Dashboard',
			protected: true
		},
		{
			path: '/onlyforadmin',
			text: 'Only For Admin',
			protected: true
		}
	];
</script>

<nav>
	<ul>
		{#each links as link}
			<!-- {#if link.path === '/' || logged_in === link.protected} -->
			{@const aria_current = $page.url.pathname == link.path ? 'page' : 'false'}
			<li>
				<a href={link.path} aria-current={aria_current}>
					{link.text}
				</a>
			</li>
			<!-- {/if} -->
		{/each}
		<li>
			<a href="/admin"> Admin </a>
		</li>
		<li>
			<form action="/logout" method="POST" class="logout-form">
				<button>Logout</button>
			</form>
		</li>
	</ul>
</nav>

<style>
	nav {
		padding-block: 1.25rem;
		background-color: var(--nav-color);
	}
	ul {
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.25rem;
	}
</style>
