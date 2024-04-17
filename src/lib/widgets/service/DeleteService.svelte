<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import { enhance, applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import type { Service } from '$lib/types';
	export let toggleDelete: () => void;
	export let service: Service;
</script>

<div class="w-screen md:w-[25rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
		<div class="float-right">
			<button
				class="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
				on:click={toggleDelete}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<img src="/images/delete.png" alt="" class="block h-12 mx-auto" />
		<form
			method="POST"
			action="/services?/delete"
			use:enhance={() => {
				return async ({ result }) => {
					updateFlash(page);
					if (result.type != 'failure') {
						toggleDelete();
						invalidateAll();
					}
				};
			}}
		>
			<div class="xl:col-span-12 hidden mt-4">
				<input
					type="text"
					name="id"
					id="id"
					value={service._id}
					class=" form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					placeholder="Id"
				/>
			</div>
			<div class="mt-5 text-center">
				{#if service}
					<h4 class="mb-1">{service?.name}</h4>
				{/if}
				<h5 class="mb-1">Are you sure?</h5>
				<p class="text-slate-500 dark:text-zink-200">
					Are you certain you want to delete this record ?
				</p>
				<div class="flex justify-center gap-2 mt-6">
					<button
						type="reset"
						class="bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-600 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10"
						on:click={toggleDelete}>Cancel</button
					>
					<button
						type="submit"
						class="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
						>Yes, Delete It!</button
					>
				</div>
			</div>
		</form>
	</div>
</div>
