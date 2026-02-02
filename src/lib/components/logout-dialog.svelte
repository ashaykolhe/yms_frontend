<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost', size: 'logoutdefault' })}
		><span class="cursor-pointer text-red-600">Logout</span></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Logout?</Dialog.Title>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'secondary' })}>Cancel</Dialog.Close>
			<form action="/logout" method="POST" use:enhance>
				<Button type="submit">Logout</Button>
			</form>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
