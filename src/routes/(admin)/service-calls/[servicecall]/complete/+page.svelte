<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Breadcrumb, LucideIcon, Modal } from '$lib/components';
	import type { ServiceCall } from '$lib/types';
	import { browser } from '$app/environment';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	let files = {
		accepted: [],
		rejected: [],
		preview: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];

		const uploadedfiles = event.target.files;

		for (var i = 0; i < uploadedfiles.length; i++) {
			const file = uploadedfiles[i];
			if (file) {
				const reader = new FileReader();

				reader.onload = (e) => {
					files.preview = [...files.preview, e.target.result];
				};

				reader.readAsDataURL(file);
			}
		}
	}

	function handleRemoveFile(e, index) {
		files.accepted.splice(index, 1);
		files.preview.splice(index, 1);
		files.accepted = [...files.accepted];
	}

	export let data: PageData;

	const serviceCall: ServiceCall = data.serviceCall;

	console.log(serviceCall);

	let longitude: number;
	let latitude: number;
	let latLongTimeStamp: string | number | Date;
	let latLongAccuracy: number;
	let pinCode: any;
	let landMark = serviceCall.address.landmark;
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

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb
		title="Service Call"
		pagetitle="Heaven Automation"
		name={serviceCall.customer?.name}
	/>
	<div class="card">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Complete Service Call</h4>
				<div class="shrink-0 flex gap-2">
					{#if listOfAddress}
						<form
							method="POST"
							action="/service-calls?/updateLocation"
							use:enhance={() => {
								return async ({ result }) => {
									updateFlash(page);
									if (result.type != 'failure') {
										invalidateAll();
									}
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
									value={serviceCall._id}
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
			<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto">
				<form
					method="POST"
					enctype="multipart/form-data"
					action="/service-calls?/complete"
					use:enhance={() => {
						return async ({ result }) => {
							updateFlash(page);
							await goto('/service-calls');
						};
					}}
				>
					<div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
						<div class="xl:col-span-6 hidden">
							<label for="service" class="inline-block mb-2 text-base font-medium">Service ID</label
							>
							<input
								type="text"
								id="service"
								name="service"
								readonly
								value={serviceCall.service._id}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service At"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="serviceCallId" class="inline-block mb-2 text-base font-medium"
								>Service Call ID</label
							>
							<input
								type="text"
								id="serviceCallId"
								name="serviceCallId"
								readonly
								value={serviceCall._id}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service At"
							/>
						</div>

						<div class="xl:col-span-6 hidden">
							<label for="serviceDateAt" class="inline-block mb-2 text-base font-medium"
								>Service At</label
							>
							<input
								type="text"
								id="serviceDateAt"
								name="serviceDateAt"
								readonly
								value={serviceCall.nextServiceAt}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service At"
							/>
						</div>
						<div class="xl:col-span-6">
							<label for="name" class="inline-block mb-2 text-base font-medium">Service Name</label>
							<input
								type="text"
								id="name"
								name="name"
								readonly
								value={serviceCall.service.name}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service Name"
							/>
						</div>
						<div class="xl:col-span-6">
							<label for="customer" class="inline-block mb-2 text-base font-medium">Customer</label>
							<input
								type="text"
								name="customer"
								readonly
								id="customer"
								value={`${serviceCall.customer?.name} | ${serviceCall.mobileNumber}`}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Customer"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
								>Mobile Number</label
							>
							<input
								type="text"
								name="mobileNumber"
								readonly
								id="mobileNumber"
								value={serviceCall.mobileNumber}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700
                                read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Mobile Number"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="serviceCallData" class="inline-block mb-2 text-base font-medium"
								>Service Call Data ID</label
							>
							<input
								type="text"
								name="serviceCallData"
								id="serviceCallData"
								readonly
								value={serviceCall.details.serviceCallData}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="ServiceCallData ID"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="id" class="inline-block mb-2 text-base font-medium">ID</label>
							<input
								type="text"
								name="id"
								id="id"
								readonly
								value={serviceCall._id}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="ID"
							/>
						</div>
					</div>
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

					<div class="xl:col-span-6 mt-2">
						<label for="remarks" class="inline-block mb-2 text-base font-medium">Remarks</label>
						<textarea
							rows="4"
							id="remarks"
							name="remarks"
							class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
							placeholder="Remarks"
						/>
						<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">Enter the Remarks</p>
					</div>
					<div class="xl:col-span-6 mt-4">
						<label for="name" class="inline-block mb-2 text-base font-medium">Upload Files</label>
						<Dropzone
							accept="image/*"
							on:drop={handleFilesSelect}
							inputElement
							name="files"
							containerClasses="flex items-center justify-center bg-white border border-dashed rounded-md cursor-pointer dropzone !border-slate-300 dropzone2 dark:!bg-zink-700 dark:!border-zink-500"
						>
							<div class="w-full py-5 text-lg text-center dz-message needsclick">
								<div class="mb-3">
									<LucideIcon
										name="UploadCloud"
										class="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500"
									/>
								</div>

								<h5 class="mb-0 font-normal text-slate-500 text-15">
									Drag and drop your files or <a href="#!">browse</a> your files
								</h5>
							</div>
						</Dropzone>
						<ul class="flex flex-wrap mb-0 gap-x-5" id="dropzone-preview">
							{#each files.accepted as item, index}
								<li class="mt-5" id="dropzone-preview-list">
									<div class="border rounded border-slate-200 dark:border-zink-500">
										<div class="p-2 text-center">
											<div>
												<div class="p-1 mx-auto rounded-md size-14 bg-slate-100 dark:bg-zink-600">
													<!-- svelte-ignore a11y-img-redundant-alt -->
													<img
														class="block w-full h-full rounded-md"
														src={files.preview[index]}
														alt="Dropzone-Image"
													/>
												</div>
											</div>
											<div class="pt-3">
												<h5 class="mb-1 text-15">{item.name}</h5>
												<p class="mb-0 text-slate-500 dark:text-zink-200">
													{(item.size / 1024).toFixed(2)} KB
												</p>
												<strong class="error text-danger"></strong>
											</div>
											<div class="mt-2">
												<button
													type="button"
													class="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
													on:click={(e) => handleRemoveFile(e, index)}>Delete</button
												>
											</div>
										</div>
									</div>
								</li>
							{/each}
						</ul>
						<div class="flex items-center gap-2 mt-2">
							<input
								id="isPending"
								name="isPending"
								class="border rounded-sm appearance-none cursor-pointer size-4 border-sky-200 bg-sky-50 checked:bg-sky-500 checked:border-sky-500 dark:border-sky-800 dark:bg-sky-500/10 dark:checked:bg-sky-500 dark:checked:border-sky-500"
								type="checkbox"
								value="isPending"
								checked={false}
							/>
							<label for="isPending" class="align-middle"> Pending </label>
						</div>
					</div>

					<div class="flex justify-end gap-2 mt-4">
						<button
							type="submit"
							class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
							>Complete</button
						>
					</div>
				</form>
			</div>
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
