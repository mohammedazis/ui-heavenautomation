<script lang="ts">
	import { goto } from '$app/navigation';
	import Dropzone from 'svelte-file-dropzone';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Breadcrumb, LucideIcon } from '$lib/components';
	import type { Installation } from '$lib/types';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	let files = {
		accepted: [],
		rejected: [],
		preview: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];

		const uploadedfiles = e.target.files;

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

	const installation: Installation = data.installation;
</script>

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb
		title="Complete Installation"
		pagetitle="Heaven Automation"
		name={installation.customer?.name}
	/>
	<div class="card">
		<div class="card-body">
			<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto">
				<form
					method="POST"
					enctype="multipart/form-data"
					action="/installations?/complete"
					use:enhance={() => {
						return async ({ result }) => {
							updateFlash(page);
							goto(result.location);
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
								value={installation.service._id}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service At"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="serviceCall" class="inline-block mb-2 text-base font-medium"
								>Service Call ID</label
							>
							<input
								type="text"
								id="serviceCall"
								name="serviceCall"
								readonly
								value={installation.details.serviceCall}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service At"
							/>
						</div>
						<div class="xl:col-span-6">
							<label for="serviceCallData" class="inline-block mb-2 text-base font-medium"
								>Service Call Data ID</label
							>
							<input
								type="text"
								name="serviceCallData"
								id="serviceCallData"
								readonly
								value={installation.details.serviceCallData}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="ServiceCallData ID"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="installationId" class="inline-block mb-2 text-base font-medium"
								>Installation ID</label
							>
							<input
								type="text"
								id="installationId"
								name="installationId"
								readonly
								value={installation._id}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Service At"
							/>
						</div>
						<div class="xl:col-span-6 hidden">
							<label for="installationDateAt" class="inline-block mb-2 text-base font-medium"
								>Service At</label
							>
							<input
								type="text"
								id="installationDateAt"
								name="installationDateAt"
								readonly
								value={installation.nextServiceAt}
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
								value={installation.service.name}
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
								value={installation.customer?.name}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Customer"
							/>
						</div>
						<div class="xl:col-span-6">
							<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
								>Mobile Number</label
							>
							<input
								type="text"
								name="mobileNumber"
								readonly
								id="mobileNumber"
								value={installation.mobileNumber}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700
                                read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="Mobile Number"
							/>
						</div>
						<div class="xl:col-span-6">
							<label for="id" class="inline-block mb-2 text-base font-medium">ID</label>
							<input
								type="text"
								name="id"
								id="id"
								readonly
								value={installation._id}
								class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
								placeholder="ID"
							/>
						</div>
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
					</div>

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
