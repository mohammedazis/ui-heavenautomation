<script lang="ts">
	import type { District } from '$lib/types';
	import { clickOutside } from '$lib/utils/functions';
	import { tweened } from 'svelte/motion';
	import { slide } from 'svelte/transition';
	export let districts: District[];

	export let name: string;
	export let value: string;

	let isDistrictOpen = false;

	const angle = tweened(90, { duration: 400 });

	const districtInputFocus = () => {
		isDistrictOpen = !isDistrictOpen;
		angle.set(isDistrictOpen ? 90 : 180);
	};

	const chooseDistrict = (district: any) => {
		value = district.name;
		name = district.id;
		districtInputFocus();
	};
</script>

<div class="xl:col-span-6 relative">
	<label for="district" class="inline-block mb-2 text-base font-medium">District</label>

	<div class="flex items-center">
		<input
			type="text"
			bind:value={name}
			id="districtId"
			name="districtId"
			placeholder="district Id"
			class="hidden"
		/>
		<input
			type="text"
			bind:value
			autocomplete="off"
			on:click={districtInputFocus}
			on:keydown={() => isDistrictOpen == true}
			on:keyup={() => isDistrictOpen == true}
			on:keypress={() => isDistrictOpen == true}
			on:input={() => isDistrictOpen == true}
			id="district"
			name="district"
			placeholder="District"
			class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
		/>
		<button
			type="button"
			on:click={districtInputFocus}
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
	{#if isDistrictOpen}
		<section
			class="absolute w-full mt-1 flex flex-col gap-1/2 z-10"
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 250 }}
		>
			{#if value}
				{#each districts.filter(({ name }) => name.includes(value)) as district}
					<button
						type="button"
						on:click={() => {
							chooseDistrict(district);
						}}
						class="bg-white z-100 flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
					>
						{district.name}
					</button>
				{/each}
			{:else}
				{#each districts as district}
					<button
						type="button"
						on:click={() => {
							chooseDistrict(district);
						}}
						class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
					>
						{district.name}
					</button>
				{/each}
			{/if}
		</section>
	{/if}
</div>
