<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { type Branch } from '$lib/types';
	export let toggleEdit: () => void;
	export let branch: Branch;
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Edit User</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleEdit}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
		<form
			method="POST"
			action="/branches?/edit"
			use:enhance={({}) => {
				return async ({ result }) => {
					updateFlash(page);
					if (result.type != 'failure') {
						toggleEdit();
						invalidateAll();
					}
				};
			}}
		>
			<div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
				<div class="xl:col-span-12">
					<label for="name" class="inline-block mb-2 text-base font-medium">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={branch.name}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Name"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="branchName" class="inline-block mb-2 text-base font-medium">Branch Name</label
					>
					<input
						type="text"
						id="branchName"
						name="branchName"
						value={branch.branchName}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Branch Name"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="id" class="inline-block mb-2 text-base font-medium">ID</label>
					<input
						type="text"
						name="id"
						id="id"
						readonly
						value={branch._id}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="ID"
					/>
				</div>
			</div>
			<div class="flex justify-end gap-2 mt-4">
				<button
					type="reset"
					data-modal-close="adduserModal"
					class="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
					on:click={toggleEdit}>Cancel</button
				>
				<button
					type="submit"
					class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
					>Update Branch</button
				>
			</div>
		</form>
	</div>
</div>
