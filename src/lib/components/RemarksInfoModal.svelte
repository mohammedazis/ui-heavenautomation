<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import type { ServiceCall } from '$lib/types';
	export let toggleRemarks: () => void;
	export let selected: ServiceCall;
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Remarks</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleRemarks}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="card">
		<div class="card-body">
			{selected.remarks ?? 'Nothing'}
		</div>
	</div>
</div>
