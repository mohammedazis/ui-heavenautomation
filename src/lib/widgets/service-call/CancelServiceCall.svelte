<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import { enhance, applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import type { ServiceCall } from '$lib/types';
	export let toggleCancel: () => void;
	export let selectedServiceCall: ServiceCall;

	console.log(selectedServiceCall);
</script>

<div class="w-screen md:w-[35rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
		<div class="float-right">
			<button
				class="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
				on:click={toggleCancel}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<h4 class="mb-3">Cancel the Service Call</h4>
		<form
			method="POST"
			action="/service-calls?/cancel"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					toggleCancel();
					invalidateAll();
					updateFlash(page);
				};
			}}
		>
			<div class="xl:col-span-12 hidden mt-4">
				<input
					type="text"
					name="serviceCallData"
					id="serviceCallData"
					value={selectedServiceCall.details.serviceCallData}
					class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					placeholder="Service Call Data ID"
				/>
			</div>
			<div class="xl:col-span-12 hidden mt-4">
				<input
					type="text"
					name="id"
					id="id"
					value={selectedServiceCall._id}
					class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					placeholder="ID"
				/>
			</div>

			<div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
				<div class="xl:col-span-12">
					<label for="name" class="inline-block mb-2 text-base font-medium">Customer Name</label>
					<input
						type="text"
						id="name"
						readonly
						name="name"
						value={selectedServiceCall.customer?.name}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Name"
					/>
				</div>
				<div class="xl:col-span-12 hidden">
					<label for="service" class="inline-block mb-2 text-base font-medium">Service ID</label>
					<input
						type="text"
						name="service"
						readonly
						id="service"
						value={selectedServiceCall.service._id}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					/>
				</div>
				<div class="xl:col-span-12 hidden">
					<label for="serviceName" class="inline-block mb-2 text-base font-medium"
						>Service Date</label
					>
					<input
						type="text"
						name="serviceDateAt"
						readonly
						id="serviceDateAt"
						placeholder="Service Name"
						value={selectedServiceCall.nextServiceAt}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="serviceName" class="inline-block mb-2 text-base font-medium"
						>Service Name</label
					>
					<input
						type="text"
						name="serviceName"
						readonly
						id="serviceName"
						placeholder="Service Name"
						value={selectedServiceCall.service.name}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					/>
				</div>
				<div class="xl:col-span-12 hidden">
					<label for="serviceCall" class="inline-block mb-2 text-base font-medium"
						>Service Call ID</label
					>
					<input
						type="text"
						readonly
						name="serviceCall"
						id="serviceCall"
						value={selectedServiceCall._id}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Service ID"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="remarks" class="inline-block mb-2 text-base font-medium">Remarks</label>
					<textarea
						rows="4"
						name="remarks"
						id="remarks"
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Remarks"
					/>
				</div>
			</div>
			<div class="flex justify-end gap-2 mt-4">
				<button
					type="reset"
					data-modal-close="adduserModal"
					class="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
					on:click={toggleCancel}>Close</button
				>
				<button
					type="submit"
					class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
					>Cancel the Service Call</button
				>
			</div>
		</form>
	</div>
</div>
