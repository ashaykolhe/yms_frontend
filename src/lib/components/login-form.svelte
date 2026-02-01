<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	import { enhance } from '$app/forms';

	const id = $props.id();
	const { error } = $props();
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			class="flex flex-col space-y-6"
			method="POST"
			use:enhance
			autocomplete="off"
			action="?/login"
		>
			<FieldGroup>
				<Field>
					<FieldLabel for="email-{id}">Email</FieldLabel>
					<Input id="email-{id}" type="email" placeholder="m@example.com" required name="email" />
				</Field>
				<Field>
					<div class="flex items-center">
						<FieldLabel for="password-{id}">Password</FieldLabel>
						<!-- <a href="##" class="ms-auto inline-block text-sm underline"> Forgot your password? </a> -->
					</div>
					<Input id="password-{id}" type="password" required name="password" />
				</Field>
				<Field>
					<Button type="submit" class="w-full">Login</Button>
				</Field>
			</FieldGroup>
		</form>

		{#if error}<p class="error">{error}</p>{/if}
	</Card.Content>
</Card.Root>
