<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import type { Installation, Lead, ServiceCall } from '$lib/types';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import moment from 'moment';
	export let toggleInfo: () => void;
	export let selected = any;
	console.log(selected);
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Data</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleInfo}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="card">
		<div class="card-body">
			<div>
				Created At : {selected.createdAt}
			</div>
			<div>
				Created By : {selected.createdBy.name}
			</div>
			<div>
				Updated At : {selected.updatedAt}
			</div>
			<div>
				Updated By : {selected.updatedBy.name}
			</div>
		</div>
	</div>
</div>
