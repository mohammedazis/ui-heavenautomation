<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { slide } from 'svelte/transition';
	let isOpen = false;
	import _ from 'lodash';
	import { UserTypes } from '$lib/utils';

	let userTypes = Object.values(UserTypes);

	export let userType: string = userTypes[0];

	const angle = tweened(90, { duration: 400 });
	const inputFocus = () => {
		isOpen = !isOpen;
		angle.set(isOpen ? 90 : 180);
	};
</script>

<div class="{$$props.class} relative">
	<label for="type" class="inline-block mb-2 text-base font-medium">Type</label>

	<div class="flex items-center">
		<input
			type="text"
			value={userType}
			on:focus={inputFocus}
			id="type"
			name="type"
			placeholder="type"
			class="hidden"
		/>
		<input
			type="text"
			value={_.startCase(_.camelCase(userType))}
			on:focus={inputFocus}
			placeholder="type"
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
	{#if isOpen}
		<section
			class="absolute w-full mt-1 flex flex-col gap-1/2"
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 250 }}
		>
			{#each userTypes as person}
				<button
					type="button"
					on:click={() => {
						userType = person;
						inputFocus();
					}}
					class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
				>
					{_.startCase(_.camelCase(person))}
				</button>
			{/each}
		</section>
	{/if}
	<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
		Choose the type for further Reference
	</p>
</div>
