<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { User } from '$lib/types';

	export let userName: string;
	export let userId: string;
	let userIsOpen = false;
	let users: User[] = [];

	const fetchUsers = async () => {
		const re = await fetch('/api/users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		users = (await re.json()).users;
	};

	onMount(() => {
		fetchUsers();
	});

	const angle = tweened(90, { duration: 400 });

	const userInputFocus = () => {
		userIsOpen = !userIsOpen;
		angle.set(userIsOpen ? 90 : 180);
	};

	const chooseUser = (user: User) => {
		userName = user.name;
		userId = user._id;
		userInputFocus();
	};
</script>

<div class="xl:col-span-12 relative">
	<label for="user" class="inline-block mb-2 text-base font-medium">Assign to</label>

	<div class="flex items-center">
		<input
			type="text"
			bind:value={userId}
			id="userId"
			name="userId"
			placeholder="user Id"
			class="hidden"
		/>
		<input
			type="text"
			bind:value={userName}
			autocomplete="off"
			on:click={userInputFocus}
			on:keyup={() => userIsOpen == true}
			id="user"
			name="user"
			placeholder="User"
			class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
		/>
		<button
			type="button"
			on:click={userInputFocus}
			class="inline-block px-3 py-2 border border-l-0 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-r-md rtl:rounded-l-md"
			><svg
				style="transform: rotate({$angle}deg);"
				width="20"
				height="20"
				class="w-5 h-5"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
			></button
		>
	</div>
	{#if userIsOpen}
		<section
			class="absolute w-full mt-1 flex flex-col gap-1/2"
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 250 }}
		>
			{#each users.filter(({ name }) => name
					.toLowerCase()
					.includes(userName.toLowerCase())) as user}
				<button
					type="button"
					on:click={() => {
						chooseUser(user);
					}}
					class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
				>
					{user.name}
				</button>
			{/each}
		</section>
	{/if}
</div>
