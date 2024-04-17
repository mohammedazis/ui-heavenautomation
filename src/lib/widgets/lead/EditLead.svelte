<script lang="ts">
	import { DistrictSelect, LucideIcon, UsersSelectLead } from '$lib/components';
	import { enhance } from '$app/forms';
	export let lead: Lead;
	export let toggleEdit: () => void;
	import { slugify } from '$lib/utils';
	import type { District, Lead, Service } from '$lib/types';
	import Flatpickr from 'svelte-flatpickr';
	import { capitalizeFirstLetter } from '$lib/utils/functions';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	export let services: Service[];
	export let districts: District[];
	export let isAdmin = false;
</script>

<div class="w-screen md:w-[60rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
		<h5 class="text-16">Edit Lead</h5>
		<button
			class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
			on:click={toggleEdit}><LucideIcon name="X" class="size-5" /></button
		>
	</div>
	<div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
		<form
			method="POST"
			action="/leads?/edit"
			use:enhance={() => {
				return async ({ result }) => {
					updateFlash(page);
					if (result.type != 'failure') {
						toggleEdit();
						invalidateAll();
					}
				};
			}}
		>
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
				<div class="xl:col-span-6">
					<label for="name" class="inline-block mb-2 text-base font-medium">Contact Person </label>
					<input
						type="text"
						id="name"
						name="name"
						value={lead.customer.name}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Contact Name"
					/>
				</div>

				<div class="xl:col-span-6">
					<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
						>Mobile Number</label
					>
					<input
						type="text"
						name="mobileNumber"
						id="mobileNumber"
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Mobile Number"
						value={lead.customer.mobileNumber}
					/>
				</div>
				<div class="xl:col-span-6 hidden">
					<label for="leadId" class="inline-block mb-2 text-base font-medium">Lead</label>
					<input
						type="text"
						id="leadId"
						name="leadId"
						bind:value={lead._id}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Area"
					/>
				</div>

				<div class="xl:col-span-6">
					<label for="customAddressArea" class="inline-block mb-2 text-base font-medium">Area</label
					>
					<input
						type="text"
						id="customAddressArea"
						name="customAddressArea"
						bind:value={lead.customAddress.area}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Area"
					/>
				</div>
				<div class="xl:col-span-6">
					<label for="customAddressStreet" class="inline-block mb-2 text-base font-medium"
						>Street</label
					>
					<input
						type="text"
						id="customAddressStreet"
						name="customAddressStreet"
						bind:value={lead.customAddress.street}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Street"
					/>
				</div>
				<DistrictSelect
					{districts}
					value={capitalizeFirstLetter(lead.customAddress?.district)}
					name={lead.customAddress.district}
				/>
				<div class="xl:col-span-12">
					<label for="remarks" class="inline-block mb-2 text-base font-medium">Remarks</label>
					<input
						type="text"
						id="remarks"
						name="remarks"
						bind:value={lead.customAddress.landmark}
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Remarks"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="services" class="inline-block mb-2 text-base font-medium">Services</label>
					<div class="flex flex-wrap gap-2">
						{#each services as service}
							<div class="flex items-center gap-2 cursor-pointer">
								<input
									id={service.slug}
									name="services"
									class="border rounded-sm appearance-none cursor-pointer size-4 bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
									type="checkbox"
									value={service._id}
									checked={lead.services.some((e) => e._id == service._id)}
								/>
								<label for={service._id} class="align-middle">
									{service.name}
								</label>
							</div>
						{/each}
					</div>
				</div>

				<div class="xl:col-span-6">
					<label for="nextFollowUpAt" class="inline-block mb-2 text-base font-medium"
						>Next Follow Up Date
					</label>
					<!-- enableTime: true -->
					<Flatpickr
						options={{
							minDate: 'today'
						}}
						id="nextFollowUpAt"
						name="nextFollowUpAt"
						value={lead.nextFollowUpAt}
						class="!none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Select date"
					></Flatpickr>
				</div>
				<div class="xl:col-span-6">
					<label for="priority" class="inline-block mb-2 text-base font-medium">Priority</label>
					<div class="flex flex-wrap gap-2">
						{#each ['High', 'Medium', 'Low'] as priority}
							<div class="flex items-center gap-2 cursor-pointer">
								<input
									id={slugify(priority)}
									name="priority"
									class="border rounded-sm appearance-none cursor-pointer size-4 bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
									type="radio"
									value={slugify(priority)}
									checked={slugify(priority) == slugify(lead.priority)}
								/>
								<label for={priority} class="align-middle"> {priority} </label>
							</div>
						{/each}
					</div>
				</div>
				{#if isAdmin}
					<UsersSelectLead userId={lead.assignedTo._id} userName={lead.assignedTo.name} />
				{/if}

				<div class="xl:col-span-12">
					<label for="reference" class="inline-block mb-2 text-base font-medium">Referred By</label>
					<input
						type="text"
						id="reference"
						value={lead.reference}
						name="reference"
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Reference"
					/>
				</div>
				<div class="xl:col-span-12">
					<label for="description" class="inline-block mb-2 text-base font-medium"
						>Description</label
					>
					<textarea
						id="description"
						rows="3"
						value={lead.description}
						name="description"
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Description"
					/>
				</div>
			</div>
			<div class="flex flex-wrap items-center justify-end gap-2 shrink-0 mt-4">
				<button
					type="reset"
					class="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
					>Cancel</button
				>
				<button
					type="submit"
					class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
					>Update Lead</button
				>
			</div>
		</form>
	</div>
</div>
