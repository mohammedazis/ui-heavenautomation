<script lang="ts">
	import { browser } from '$app/environment';
	import {
		HeadTitle,
		Breadcrumb,
		LucideIcon,
		CustomerSelect,
		Modal,
		ServicesSelect,
		DistrictSelect
	} from '$lib/components';
	import { enhance } from '$app/forms';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import type { Installation } from '$lib/types';

	export let selectedInstallation: Installation;
	export let toggleEdit: () => void;

	let latitude: number = selectedInstallation.address.latitude;
	let mobileNumber: any = selectedInstallation.customer.mobileNumber;
	let longitude: number = selectedInstallation.address.longitude;
	let latLongTimeStamp: string | number | Date;
	let latLongAccuracy: number;
	let pinCode: any = selectedInstallation.address.pincode;
	let landMark: any = selectedInstallation.address.landmark;
	let districtName: any = selectedInstallation.address.district;
	let areaName: any = selectedInstallation.address.area;
	let streetName: any = selectedInstallation.address.street;

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

<HeadTitle title="Edit Installation" />

<div class="w-screen md:w-[35rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
		<div class="float-right">
			<button
				class="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
				on:click={toggleEdit}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<form
			method="POST"
			action="/installations?/edit"
			use:enhance={() => {
				return async ({ result }) => {
					updateFlash(page);
					if (result.type != 'failure') {
						toggleEdit();
						goto('/installations');
						invalidateAll();
					}
				};
			}}
		>
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
				<div class="xl:col-span-12">
					<label for="id" class="inline-block mb-2 text-base font-medium">ID</label>
					<input
						type="text"
						id="id"
						readonly
						name="id"
						class="form-input read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Mobile Number"
						value={selectedInstallation._id}
					/>
				</div>
				<CustomerSelect
					readonly={true}
					bind:mobileNumber
					customerId={selectedInstallation.customer._id}
					value={selectedInstallation.customer.name}
				/>
				<div class="xl:col-span-6">
					<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
						>Mobile Number</label
					>
					<input
						type="text"
						readonly
						id="mobileNumber"
						name="mobileNumber"
						class="form-input read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Mobile Number"
						bind:value={mobileNumber}
					/>
					<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Recheck the Mobile Number</p>
				</div>
				<ServicesSelect
					serviceId={selectedInstallation.service._id}
					serviceName={selectedInstallation.service.name}
				/>

				<div class="xl:col-span-6">
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
					<label for="longitude" class="inline-block mb-2 text-base font-medium">Longitude</label>
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
					<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Area of the Current Location</p>
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
				<div class="xl:col-span-12">
					<label for="remarks" class="inline-block mb-2 text-base font-medium">Remarks</label>
					<textarea
						rows="4"
						id="remarks"
						value={selectedInstallation.remarks}
						name="remarks"
						class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
						placeholder="Remarks"
					/>
					<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Enter the Remarks</p>
				</div>
			</div>
			<div class="flex flex-col items-center mt-5 md:flex-row">
				<div class="mb-4 grow md:mb-0">
					{#if latLongTimeStamp}
						Location Updated on : <span class="text-custom-500"
							>{new Date(latLongTimeStamp).toLocaleTimeString()}</span
						>
						with Accuracy of
						{Math.trunc(latLongAccuracy)}
					{/if}
				</div>

				<div class="flex flex-wrap items-center justify-end gap-2 shrink-0">
					<button
						type="reset"
						class="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
						>Cancel</button
					>
					<button
						type="submit"
						class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
						>Edit Installation</button
					>
				</div>
			</div>
		</form>
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
