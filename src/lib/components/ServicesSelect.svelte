<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { LucideIcon, Modal } from '$lib/components';

	import { AddService } from '$lib/widgets';
	import { clickOutside, makeLowerCase, slugify } from '$lib/utils/functions';
	export let serviceName: String;
	export let serviceId: any;
	let isServiceOpen = false;

	let services: any[] = [];

	const fetchServices = async () => {
		const re = await fetch('/api/services', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		services = await re.json();
	};
	onMount(() => {
		fetchServices();
	});

	let isServiceModel = false;
	const toggleServiceAdd = () => (isServiceModel = !isServiceModel);

	// $: !isNaN(value) && fetchServices();

	const angle = tweened(90, { duration: 400 });
	const serviceInputFocus = () => {
		isServiceOpen = !isServiceOpen;
		angle.set(isServiceOpen ? 90 : 180);
	};

	const chooseService = (service: any) => {
		serviceName = service.name;
		serviceId = service._id;
		serviceInputFocus();
	};
</script>

<div class="xl:col-span-9 relative z-1">
	<label for="service" class="inline-block mb-2 text-base font-medium">Service</label>

	<div class="flex items-center">
		<input
			type="text"
			bind:value={serviceId}
			id="serviceId"
			name="serviceId"
			placeholder="service Id"
			class="hidden"
		/>
		<input
			type="text"
			bind:value={serviceName}
			on:click={serviceInputFocus}
			on:keypress={() => isServiceModel == true}
			id="service"
			autocomplete="off"
			name="service"
			placeholder="Service"
			class="ltr:rounded-r-none cursor-pointer rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
		/>
		<button
			type="button"
			on:click={serviceInputFocus}
			class="inline-block px-3 py-2 border border-l-0 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-r-md rtl:rounded-l-md"
			><svg
				style="transform: rotate({$angle}deg);"
				width="20"
				height="20"
				class="w-5 h-5"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
			></button
		>
	</div>
	{#if isServiceOpen}
		<section
			class="absolute w-full mt-1 flex flex-col gap-1/2 z-10"
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 250 }}
		>
			{#if services.length > 0}
				{#each services.filter( ({ name }) => makeLowerCase(name).includes(makeLowerCase(serviceName)) ) as service}
					<button
						type="button"
						on:click={() => chooseService(service)}
						class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
					>
						{service.name}
					</button>
				{/each}
			{:else}
				<div class="flex items-center">
					<input
						type="text"
						value="No service Found"
						placeholder="No service Found"
						class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					/>
					<button
						type="button"
						class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
						on:click={toggleServiceAdd}
						><LucideIcon name="Plus" class="inline-block size-4" />
					</button>
				</div>
			{/if}
		</section>
	{/if}
	<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
		Choose the service for further Reference
	</p>
</div>

<Modal modal-center className="-translate-y-2/4" isOpen={isServiceModel} toggle={toggleServiceAdd}>
	<AddService toggleAdd={toggleServiceAdd} bind:serviceName {fetchServices} />
</Modal>
