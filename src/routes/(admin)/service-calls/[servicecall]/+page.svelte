<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { HeadTitle, Breadcrumb, LucideIcon } from '$lib/components';
	import moment from 'moment';
	import Modal from '$lib/components/Modal.svelte';
	import type { ServiceCallData } from '$lib/types';
	import Slider from '$lib/components/Slider.svelte';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { updateFlash } from 'sveltekit-flash-message';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let isServiceCallDataImgModal = false;

	let selectedServiceCallData: ServiceCallData;

	let longitude: number;
	let latitude: number;
	let latLongTimeStamp: string | number | Date;
	let latLongAccuracy: number;
	let pinCode: any;
	let landMark = data.serviceCall?.address?.landmark;
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

	const toggleServiceCallDataImgModal = () =>
		(isServiceCallDataImgModal = !isServiceCallDataImgModal);

	console.log(data.serviceCallDatas);
</script>

<HeadTitle title="Add Service Calls" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Add Service Calls" pagetitle="Heaven Automation" />

	<div class="card" id="ordersTable">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Edit</h4>
				<div class="shrink-0 flex gap-2">
					{#if listOfAddress}
						<form
							method="POST"
							action="/service-calls?/updateLocation"
							use:enhance={() => {
								return async ({ result }) => {
									updateFlash(page);
									goto('/service-calls');
								};
							}}
						>
							<div class="xl:col-span-6 hidden">
								<label for="id" class="inline-block mb-2 text-base font-medium"
									>Service Call ID</label
								>
								<input
									type="text"
									id="id"
									name="id"
									readonly
									value={data.serviceCall._id}
									class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
									placeholder="Service At"
								/>
							</div>
							<div class="xl:col-span-6 mt-4 hidden">
								<label for="landmark" class="inline-block mb-2 text-base font-medium"
									>Landmark</label
								>
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
								<label for="latitude" class="inline-block mb-2 text-base font-medium"
									>Latitude</label
								>
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
								<label for="district" class="inline-block mb-2 text-base font-medium"
									>District</label
								>
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
							<button
								type="submit"
								class="text-white btn bg-teal-500 border-teal-500 hover:text-white hover:bg-teal-600 hover:border-teal-600 focus:text-white focus:bg-teal-600 focus:border-teal-600 focus:ring focus:ring-teal-100 active:text-white active:bg-teal-600 active:border-teal-600 active:ring active:ring-teal-100 dark:ring-custom-400/20"
								><LucideIcon name="MapPin" class="inline-block size-4" />
								<span class="align-middle">Update Location</span></button
							>
						</form>
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
			{#if data.serviceCallDatas}
				{#each data.serviceCallDatas as serviceCallData}
					<div class="card">
						<div class="card-body">
							<div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
								{#if serviceCallData.files.length != 0}
									<div class="p-4 rounded-md lg:col-span-2 bg-slate-100 dark:bg-zink-600">
										<button
											type="button"
											on:click={() => {
												toggleServiceCallDataImgModal();
												selectedServiceCallData = serviceCallData;
											}}
										>
											<img
												src="https://api.heavenautomation.digipl.us/uploads/{serviceCallData
													.files[0]}"
												alt=""
											/>
										</button>
									</div>
								{/if}

								<div class="flex flex-col lg:col-span-4">
									<button
										type="button"
										class="relative w-fit flex items-center justify-center text-white btn bg-teal-500 border-teal-500 hover:text-white hover:bg-teal-600 hover:border-teal-600 focus:text-white focus:bg-teal-600 focus:border-teal-600 focus:ring focus:ring-teal-100 active:text-white active:bg-teal-600 active:border-teal-600 active:ring active:ring-teal-100 dark:ring-teal-400/20"
									>
										{serviceCallData.service.name}
									</button>
									<div>
										<h5 class="my-2 text-16">
											{moment(serviceCallData.createdAt).format('Do MMMM Y')}
										</h5>
										<p class="text-slate-500 text-l">
											Created By : {serviceCallData.createdBy.name}
										</p>
										{#if serviceCallData.assignedTo}
											<p class="text-slate-500 text-l">
												First Person : {serviceCallData.assignedTo.name}
											</p>
										{/if}
										{#if serviceCallData.assignedToSecond}
											<p class="text-slate-500 text-l">
												Second Person : {serviceCallData.assignedToSecond.name}
											</p>
										{/if}

										{#if serviceCallData.remarks}
											<p class="text-slate-500 text-xl">
												{serviceCallData.remarks}
											</p>
										{/if}
									</div>
								</div>

								<div class="flex justify-between w-full lg:flex-col lg:col-end-13 lg:col-span-2">
									<div class="mb-auto ltr:lg:text-right rtl:lg:text-left">
										<h6 class="text-16 products-price">
											{#if serviceCallData.uploadedBy}
												<span class="mr-2">
													{serviceCallData.uploadedBy?.name}
												</span>
											{/if}
											{#if serviceCallData.isCancel}
												<span
													class="px-2.5 py-1.5 inline-block text-m font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent"
													>Cancel</span
												>
											{:else if serviceCallData.isPending}
												<span
													class="px-2.5 py-1.5 inline-block text-m font-medium rounded border bg-orange-100 border-transparent text-orange-500 dark:bg-orange-500/20 dark:border-transparent"
													>Pending</span
												>
											{:else if serviceCallData.isCompleted}
												<span
													class="px-2.5 py-1.5 inline-block text-m font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
												>
													Completed
												</span>
											{:else}
												<span
													class="px-2.5 py-1.5 inline-block text-m font-medium rounded border bg-purple-100 border-transparent text-purple-500 dark:bg-purple-500/20 dark:border-transparent"
												>
													Not Yet Started
												</span>{/if}
										</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<Modal
	modal-center
	className="-translate-y-2/4"
	fullscreen={true}
	isOpen={isServiceCallDataImgModal}
	toggle={toggleServiceCallDataImgModal}
>
	<div class="card">
		<div class="card-body items-center flex flex-col justify-center w-auto">
			<Slider
				slides={selectedServiceCallData.files}
				duration={10000}
				description={selectedServiceCallData.remarks}
			/>
		</div>
	</div>
</Modal>

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
