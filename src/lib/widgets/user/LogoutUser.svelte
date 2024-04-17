<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	export let toggleLogout: () => void;
</script>

<div class="w-screen md:w-[25rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
		<div class="float-right">
			<button
				class="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
				on:click={toggleLogout}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<img src="/images/delete.png" alt="" class="block h-12 mx-auto" />

		<div class="mt-5 text-center">
			{#if $page.data.user}
				<h4 class="mb-1">{$page.data.user.name}</h4>
			{/if}
			<h5 class="mb-1">Are you sure?</h5>
			<p class="text-slate-500 dark:text-zink-200">
				Are you certain you want to logout this record ?
			</p>
			<div class="flex justify-center gap-2 mt-6">
				<button
					type="reset"
					class="bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-600 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10"
					on:click={toggleLogout}>Cancel</button
				>
				<button
					type="submit"
					class="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
					>Logout</button
				>
			</div>
		</div>
	</div>
</div>
