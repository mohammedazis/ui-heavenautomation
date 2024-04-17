<script lang="ts">
	import { LucideIcon } from '$lib/components';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { updateFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import type { Lead } from '$lib/types';
	import Dropzone from 'svelte-file-dropzone';
	export let toggleUpload: () => void;
	export let lead: Lead;

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
</script>

<div class="w-screen md:w-[50rem] bg-white shadow rounded-md dark:bg-zink-600">
	<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
		<div class="float-right">
			<button
				class="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
				on:click={toggleUpload}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<form
			method="POST"
			enctype="multipart/form-data"
			action="/leads?/upload"
			use:enhance={() => {
				return async ({ result: { type, status } }) => {
					updateFlash(page);
					if (type != 'failure') {
						toggleUpload();
						invalidateAll();
					}
				};
			}}
		>
			<div class="xl:col-span-12 hidden mt-4">
				<input
					type="text"
					name="id"
					id="id"
					value={lead._id}
					class=" form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					placeholder="Id"
				/>
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
			<div class="mt-5 text-center">
				<div class="flex justify-center gap-2 mt-6">
					<button
						type="reset"
						class="bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-600 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10"
						on:click={toggleUpload}>Cancel</button
					>
					<button
						type="submit"
						class="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
						>Yes, Upload!</button
					>
				</div>
			</div>
		</form>
	</div>
</div>
