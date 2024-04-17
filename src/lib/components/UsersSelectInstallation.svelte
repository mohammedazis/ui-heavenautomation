<script lang="ts">
	import { enhance } from '$app/forms';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { LucideIcon } from '$lib/components';
	import { invalidateAll } from '$app/navigation';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import type { Installation } from '$lib/types';

	export let selectedInstallation: Installation;
	export let toggleAssignPeoples: () => void;
	let value: string = '';
	let userId: any;

	let secondValue: string = '';
	let secondUserId: any;

	if (selectedInstallation.assignedToSecond) {
		secondUserId = selectedInstallation.assignedToSecond._id;
		secondValue = selectedInstallation.assignedToSecond.name;
	}

	if (selectedInstallation.assignedTo) {
		userId = selectedInstallation.assignedTo._id;
		value = selectedInstallation.assignedTo.name;
	}

	let isUserOpen = false;
	let isUserSecondOpen = false;

	let users: any[] = [];

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

	const secondAngle = tweened(90, { duration: 400 });
	const secondInputFocus = () => {
		isUserSecondOpen = !isUserSecondOpen;
		secondAngle.set(isUserSecondOpen ? 90 : 180);
	};

	const angle = tweened(90, { duration: 400 });
	const inputFocus = () => {
		isUserOpen = !isUserOpen;
		angle.set(isUserOpen ? 90 : 180);
	};
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Assign People</h5>
		<button
			type="button"
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleAssignPeoples}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="max-h-[calc(theme('height.screen')_-_180px)] p-4">
		<div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
			<div class="xl:col-span-12 relative">
				<form
					action="/installations?/assignPeople"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							updateFlash(page);
							if (result.type != 'failure') {
								toggleAssignPeoples();
								invalidateAll();
							}
						};
					}}
				>
					<label for="user" class="inline-block mb-2 text-base font-medium">User</label>
					<div class="flex items-center">
						<input
							type="text"
							bind:value={selectedInstallation._id}
							id="installationId"
							name="installationId"
							placeholder="Service Id"
							class="hidden"
						/>
						<input
							type="text"
							bind:value={userId}
							id="userId"
							name="userId"
							placeholder="User Id"
							class="hidden"
						/>
						<input
							type="text"
							bind:value
							autocomplete="off"
							on:click={inputFocus}
							id="user"
							name="user"
							placeholder="User"
							class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						/>
						<button
							type="button"
							on:click={inputFocus}
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
					{#if isUserOpen}
						<section
							class="absolute w-full mt-1 flex flex-col gap-1/2"
							in:slide={{ duration: 250 }}
							out:slide={{ duration: 250 }}
						>
							{#if users.filter((each) => each.name
									.toLowerCase()
									.includes(value.toLowerCase())).length > 0}
								{#each users.filter((each) => each.name
										.toLowerCase()
										.includes(value.toLowerCase())) as user}
									<button
										on:click={() => {
											value = user.name;
											userId = user._id;
											inputFocus();
											invalidateAll();
										}}
										type="button"
										class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
									>
										{user.name}
									</button>
								{/each}
							{:else}
								<div class="flex items-center">
									<input
										type="text"
										value="No User Found"
										placeholder="No User Found"
										class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
									/>
								</div>
							{/if}
						</section>
					{/if}
					<label for="secondUser" class="inline-block my-2 text-base font-medium"
						>Second Person</label
					>
					<div class="flex items-center">
						<input
							type="text"
							bind:value={secondUserId}
							id="secondUserId"
							name="secondUserId"
							placeholder="Second User Id"
							class="hidden"
						/>
						<input
							type="text"
							bind:value={secondValue}
							autocomplete="off"
							on:click={secondInputFocus}
							id="secondUser"
							name="secondUser"
							placeholder="Second Person"
							class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						/>
						<button
							type="button"
							on:click={secondInputFocus}
							class="inline-block px-3 py-2 border border-l-0 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-r-md rtl:rounded-l-md"
							><svg
								style="transform: rotate({$secondAngle}deg);"
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
					{#if isUserSecondOpen}
						<section
							class="absolute w-full mt-1 flex flex-col gap-1/2"
							in:slide={{ duration: 250 }}
							out:slide={{ duration: 250 }}
						>
							{#if users.length > 0}
								{#each users.filter((each) => each.name
										.toLowerCase()
										.includes(secondValue.toLowerCase())) as user}
									<button
										on:click={() => {
											secondValue = user.name;
											secondUserId = user._id;
											secondInputFocus();
											invalidateAll();
										}}
										type="button"
										class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
									>
										{user.name}
									</button>
								{/each}
							{:else}
								<div class="flex items-center">
									<input
										type="text"
										value="No User Found"
										placeholder="No User Found"
										class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
									/>
									<button
										type="button"
										class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
										on:click={toggleAssignPeoples}
										><LucideIcon name="Plus" class="inline-block size-4" />
									</button>
								</div>
							{/if}
						</section>
					{/if}
					<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
						Choose the Second User for further Reference
					</p>
					<div class="flex justify-center mt-2 shrink-0">
						<button
							type="submit"
							class="text-white btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-custom-400/20"
							><LucideIcon name="AudioLines" class="inline-block size-4" />
							<span class="align-middle">Submit</span></button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
