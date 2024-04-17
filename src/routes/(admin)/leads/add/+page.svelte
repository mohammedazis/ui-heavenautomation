<script lang="ts">
	import { enhance } from '$app/forms';
	import { redirect } from '@sveltejs/kit';
	import {
		HeadTitle,
		Breadcrumb,
		UsersSelectLead,
		DistrictSelect,
		LucideIcon,
		Modal
	} from '$lib/components';
	import type { PageData } from './$types';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import { slugify } from '$lib/utils';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let longitude: number;
	let latitude: number;
	let latLongTimeStamp: string | number | Date;
	let latLongAccuracy: number;
	let pinCode: any;
	let landMark: any;
	let districtName: any;
	let areaName: any;
	let streetName: any;

	let showLocationLoader = false;

	let isLocationSuggestionModel = false;
	const toggleSuggestionModel = () => (isLocationSuggestionModel = !isLocationSuggestionModel);

	let listOfAddress: { results: any };

	const locationSuggestions = async (latitude: string, longitude: string) => {
		const req = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAXFGlqER9hmidQ35t12WXHJjXsJd4A98w`
		);

		listOfAddress = await req.json();
		showLocationLoader = false;
	};

	const updateAddress = (address: { formatted_address: any; address_components: any[] }) => {
		landMark = address.formatted_address;
		address.address_components.map((eachInAddress: { types: any[]; long_name: any }) => {
			eachInAddress.types.map((eachType: any) => {
				switch (eachType) {
					case 'postal_code':
						pinCode = eachInAddress.long_name;
						break;
					case 'administrative_area_level_3':
						districtName = eachInAddress.long_name;
						break;
					case 'route':
						streetName = eachInAddress.long_name;
						break;
					case 'sublocality_level_1':
						areaName = eachInAddress.long_name;
						break;
					case 'sublocality_level_2':
						if (!streetName) streetName = eachInAddress.long_name;
						break;
				}
			});
		});
		toggleSuggestionModel();
	};

	const getLocation = () => {
		if (browser) {
			showLocationLoader = true;
			navigator.geolocation.getCurrentPosition(async (loc) => {
				latitude = loc.coords.latitude;
				longitude = loc.coords.longitude;
				latLongAccuracy = loc.coords.accuracy;
				latLongTimeStamp = loc.timestamp;
				locationSuggestions(loc.coords.latitude.toFixed(4), loc.coords.longitude.toFixed(4));
				toggleSuggestionModel();
			});
		}
	};
</script>

<HeadTitle title="Add Lead" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Add Lead" pagetitle="Heaven Automation" />

	<div class="card" id="ordersTable">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Create</h4>
				<div class="shrink-0">
					{#if listOfAddress}
						<button
							type="button"
							class="text-white btn bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100 dark:ring-custom-400/20"
							on:click={toggleSuggestionModel}
							><LucideIcon name="AudioLines" class="inline-block size-4" />
							<span class="align-middle">Suggestions</span></button
						>
					{/if}
					<button
						type="button"
						class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
						on:click={getLocation}
					>
						<LucideIcon name="MapPin" class="inline-block size-4" />
						<span class="align-middle"> {!showLocationLoader ? 'Get' : 'Getting'} Location</span>
						{#if showLocationLoader}
							<svg
								class="inline-block size-4 ltr:ml-2 rtl:mr-2 animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						{/if}
					</button>
				</div>
			</div>
			<form
				method="POST"
				action="/leads?/add"
				use:enhance={() => {
					return async ({ result }) => {
						updateFlash(page);
						if (result.type != 'failure') {
							goto('/leads');
						}
					};
				}}
			>
				<div class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
					<div class="xl:col-span-6">
						<label for="name" class="inline-block mb-2 text-base font-medium"
							>Contact Person
						</label>
						<input
							type="text"
							id="name"
							name="name"
							class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
							placeholder="Contact Name"
						/>
					</div>
					<div class="xl:col-span-6">
						<label for="companyName" class="inline-block mb-2 text-base font-medium"
							>Company Name
						</label>
						<input
							type="text"
							id="companyName"
							name="companyName"
							class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
							placeholder="Company Name"
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
						/>
					</div>
					{#if listOfAddress}
						<div class="xl:col-span-6 mt-4">
							<label for="landmark" class="inline-block mb-2 text-base font-medium">Landmark</label>
							<input
								type="text"
								bind:value={landMark}
								id="landmark"
								name="landmark"
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Landmark"
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
								Landmark for the Future Reference
							</p>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="latitude" class="inline-block mb-2 text-base font-medium">Latitude</label>
							<input
								type="text"
								id="latitude"
								name="latitude"
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Latitude"
								bind:value={latitude}
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
								Latitude of the Current Location
							</p>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="longitude" class="inline-block mb-2 text-base font-medium"
								>Longitude</label
							>
							<input
								type="text"
								id="longitude"
								name="longitude"
								bind:value={longitude}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Longitude"
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
								Longitude of the Current Location
							</p>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="street" class="inline-block mb-2 text-base font-medium">Street</label>
							<input
								type="text"
								bind:value={streetName}
								id="street"
								name="street"
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Street"
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Enter the Street</p>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="area" class="inline-block mb-2 text-base font-medium">Area</label>
							<input
								type="text"
								id="area"
								name="area"
								bind:value={areaName}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Area"
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
								Area of the Current Location
							</p>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="district" class="inline-block mb-2 text-base font-medium">District</label>
							<input
								type="text"
								id="district"
								name="district"
								bind:value={districtName}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="District"
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Enter the District</p>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="pincode" class="inline-block mb-2 text-base font-medium">Pincode</label>
							<input
								type="text"
								id="pincode"
								name="pincode"
								bind:value={pinCode}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Pincode"
							/>
							<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Enter the Pincode</p>
						</div>
					{:else}
						<DistrictSelect districts={data.districts} name="trichy" value="Trichy" />

						<div class="xl:col-span-6">
							<label for="customAddressArea" class="inline-block mb-2 text-base font-medium"
								>Area</label
							>
							<input
								type="text"
								id="customAddressArea"
								name="customAddressArea"
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
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Street"
							/>
						</div>
						<div class="xl:col-span-12">
							<label for="remarks" class="inline-block mb-2 text-base font-medium">Remarks</label>
							<input
								type="text"
								id="remarks"
								name="remarks"
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Remarks"
							/>
						</div>
					{/if}
					<div class="xl:col-span-12">
						<label for="services" class="inline-block mb-2 text-base font-medium">Services</label>
						<div class="flex flex-wrap gap-2">
							{#each data.services as service}
								<div class="flex items-center gap-2 cursor-pointer">
									<input
										id={service.slug}
										name="services"
										class="border rounded-sm appearance-none cursor-pointer size-4 bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
										type="checkbox"
										value={service._id}
									/>
									<label for={service._id} class="align-middle"> {service.name} </label>
								</div>
							{/each}
						</div>
					</div>
					<div class="xl:col-span-12">
						<label for="reference" class="inline-block mb-2 text-base font-medium"
							>Referred By</label
						>
						<input
							type="text"
							id="reference"
							name="reference"
							class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
							placeholder="Reference"
						/>
					</div>
					{#if data.authUser.type == 'admin'}
						<UsersSelectLead userId={data.authUser._id} userName={data.authUser.name} />
					{/if}
					<div class="xl:col-span-6">
						<label for="nextFollowUpAt" class="inline-block mb-2 text-base font-medium"
							>Next Follow Up Date
						</label>
						<Flatpickr
							options={{
								minDate: 'today'
							}}
							value={new Date()}
							id="nextFollowUpAt"
							name="nextFollowUpAt"
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
									/>
									<label for={priority} class="align-middle"> {priority} </label>
								</div>
							{/each}
						</div>
					</div>

					<div class="xl:col-span-12">
						<label for="description" class="inline-block mb-2 text-base font-medium"
							>Description</label
						>
						<textarea
							id="description"
							rows="3"
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
						>Add Lead</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

<Modal
	modal-center
	className="-translate-y-2/4"
	isOpen={isLocationSuggestionModel}
	toggle={toggleSuggestionModel}
>
	<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
		<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
			<h5 class="text-16">Choose from these Locations</h5>
			<button
				class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
				on:click={toggleSuggestionModel}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 flex flex-col items-start">
			{#if listOfAddress?.results}
				{#each listOfAddress?.results as address}
					<button
						on:click={() => updateAddress(address)}
						class="transition-all duration-200 ease-linear text-slate-700 hover:text-red-500 bg-gray-100 p-2 m-1 w-full rounded"
					>
						{address.formatted_address}
					</button>
				{/each}
			{/if}
		</div>
	</div>
</Modal>

<style>
	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
