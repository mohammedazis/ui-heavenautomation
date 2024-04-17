<script lang="ts">
	let isServiceCallDataImgModal = false;
	const toggleServiceCallDataImgModal = () =>
		(isServiceCallDataImgModal = !isServiceCallDataImgModal);
	import { invalidateAll } from '$app/navigation';
	import { Breadcrumb, HeadTitle, LucideIcon, Modal } from '$lib/components';
	import Slider from '$lib/components/Slider.svelte';
	import moment from 'moment';
	import type { PageData } from './$types';
	let selectedServiceCallData;
	export let data: PageData;
</script>

<HeadTitle title="Pendings Installations" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Pendings Installations" pagetitle="Heaven Automation" />
	<div class="card">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Pending Installations</h4>
				{#if data.serviceCalls.length != 0}
					<button
						type="button"
						class="flex items-center justify-center size-[37.5px] p-0 text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20"
						on:click={() => invalidateAll()}
					>
						<LucideIcon name="RotateCw" class="size-4" />
					</button>
				{/if}
			</div>
			{#each data.serviceCalls as serviceCallData}
				<div class="card">
					<div class="card-body">
						<div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
							{#if !serviceCallData.isCancel || serviceCallData.isPending}
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
								<div>
									<h5 class="mb-1 text-16">
										Date : {moment(serviceCallData.createdAt).format('Do MMMM Y')}
									</h5>
									<p class="mb-2 text-slate-500 dark:text-zink-200">
										Service : {serviceCallData.service.name}
									</p>
									{#if serviceCallData.isCancel}
										<p class="text-slate-500 text-xl">
											{serviceCallData.remarks}
										</p>
									{/if}
								</div>
							</div>

							<div class="flex justify-between w-full lg:flex-col lg:col-end-13 lg:col-span-2">
								<div class="mb-auto ltr:lg:text-right rtl:lg:text-left">
									<h6 class="text-16 products-price">
										<span class="mr-2">
											{serviceCallData.uploadedBy.name}
										</span>
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
										{:else}
											<span
												class="px-2.5 py-1.5 inline-block text-m font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent"
											>
												Completed
											</span>
										{/if}
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
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
