<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import { enhance } from '$app/forms';
	import type { Lead } from '$lib/types';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	export let toggleConvert: () => void;
	export let lead: Lead;
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Convert Lead</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleConvert}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
		<form
			method="POST"
			action="/leads?/convert"
			use:enhance={() => {
				return async ({ result: { type, status } }) => {
					updateFlash(page);
					if (type != 'failure') {
						toggleConvert();
						invalidateAll();
					}
				};
			}}
		>
			<div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
				<div class="xl:col-span-12">
					<label for="id" class="inline-block mb-2 text-base font-medium">ID</label>
					<input
						type="text"
						name="id"
						id="id"
						readonly
						value={lead._id}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="ID"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="name" class="inline-block mb-2 text-base font-medium">Lead Name</label>
					<input
						type="text"
						id="name"
						name="name"
						bind:value={lead.contactPerson.name}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Lead Name"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
						>Mobile Number</label
					>
					<input
						type="text"
						name="mobileNumber"
						id="mobileNumber"
						value={lead.contactPerson.mobileNumber}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Mobile Number"
					/>
				</div>

				<div class="xl:col-span-12">
					<label for="description" class="inline-block mb-2 text-base font-medium"
						>Description</label
					>
					<textarea
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						id="description"
						name="description"
						rows="3"
					></textarea>
				</div>
			</div>
			<div class="flex justify-end gap-2 mt-4">
				<button
					type="reset"
					class="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
					on:click={toggleConvert}>Cancel</button
				>
				<button
					type="submit"
					class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
					>Convert</button
				>
			</div>
		</form>
	</div>
</div>
