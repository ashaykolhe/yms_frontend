<script lang="ts">
	import { page } from '$app/stores';

	// export let logged_in = false;
	export let isAdmin;

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
		}
	];
</script>

<nav>
	<ul>
		{#each links as link}
			<!-- {#if link.path === '/' || logged_in === link.protected || !isAdmin} -->
			{@const aria_current = $page.url.pathname == link.path ? 'page' : 'false'}
			<li>
				<a href={link.path} aria-current={aria_current}>
					{link.text}
				</a>
			</li>
			<!-- {/if} -->
			{#if isAdmin}
				<!-- {@const aria_current = $page.url.pathname == '/admin' ? 'page' : 'false'} -->
				<li>
					<a href="/admin" aria-current={aria_current}> Admin </a>
				</li>
			{/if}
		{/each}
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
