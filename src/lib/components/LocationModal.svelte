<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import type { Installation, Lead, ServiceCall } from '$lib/types';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	export let toggleLocation: () => void;
	export let selected: ServiceCall | Installation | Lead;
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">User Location</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleLocation}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="card">
		<div class="card-body">
			{#each Object.entries(selected.address) as ee}
				<div class="text-xl">
					{capitalizeFirstLetter(ee[0])} : {ee[1] ?? '-'}
				</div>
			{/each}
		</div>
	</div>
</div>
