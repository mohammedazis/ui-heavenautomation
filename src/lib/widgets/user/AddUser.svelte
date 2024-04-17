<script lang="ts">
	import { BranchSelect, LucideIcon, UserTypeSelect } from '$lib/components';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let toggleAdd: () => void;
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	export let mobileNumber: String;
</script>

<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Add User</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleAdd}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
		<form
			method="POST"
			action="/users?/add"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result }) => {
					updateFlash(page);
					if (result.type != 'failure') {
						toggleAdd();
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
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Name"
					/>
				</div>
				<UserTypeSelect class="xl:col-span-12" />
				<BranchSelect class="xl:col-span-12" />

				<div class="xl:col-span-12">
					<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
						>Mobile Number</label
					>
					<input
						type="text"
						name="mobileNumber"
						id="mobileNumber"
						bind:value={mobileNumber}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Mobile Number"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="password" class="inline-block mb-2 text-base font-medium">Password</label>
					<input
						type="text"
						id="password"
						name="password"
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Password"
					/>
				</div>
				<div class="xl:col-span-12">
					<div class="flex items-center">
						<div
							class="relative inline-block w-10 align-middle transition duration-200 ease-in ltr:mr-2 rtl:ml-2"
						>
							<input
								type="checkbox"
								name="isActive"
								id="isActive"
								class="absolute block size-5 transition duration-300 ease-linear border-2 rounded-full appearance-none cursor-pointer border-slate-200 dark:border-zink-500 bg-white/80 dark:bg-zink-400 peer/published checked:bg-white dark:checked:bg-white ltr:checked:right-0 rtl:checked:left-0 checked:bg-none checked:border-custom-500 dark:checked:border-custom-500 arrow-none"
								checked
							/>
							<label
								for="isActive"
								class="block h-5 overflow-hidden duration-300 ease-linear border rounded-full cursor-pointer cursor-pointertransition border-slate-200 dark:border-zink-500 bg-slate-200 dark:bg-zink-600 peer-checked/published:bg-custom-500 peer-checked/published:border-custom-500"
							></label>
						</div>
						<label for="isActive" class="inline-block text-base font-medium cursor-pointer"
							>Is Active</label
						>
					</div>
				</div>
			</div>
			<div class="flex justify-end gap-2 mt-4">
				<button
					type="reset"
					data-modal-close="addUserModal"
					class="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
					on:click={toggleAdd}>Cancel</button
				>
				<button
					type="submit"
					class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
					>Add User</button
				>
			</div>
		</form>
	</div>
</div>
