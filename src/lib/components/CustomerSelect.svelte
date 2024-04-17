<script lang="ts">
	import { clickOutside } from '$lib/utils/functions';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { LucideIcon, Modal } from '$lib/components';
	import { AddCustomer } from '$lib/widgets';
	export let mobileNumber;
	export let value: number;
	export let readonly = false;
	export let customerId: any;
	let customerIsOpen = false;
	let customers: any[] = [];

	const fetchCustomers = async () => {
		const re = await fetch('/api/customers/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				mobileNumber: value
			})
		});
		customers = await re.json();
	};

	onMount(() => {
		fetchCustomers();
	});

	let isCustomerAddModal = false;
	const toggleAdd = () => (isCustomerAddModal = !isCustomerAddModal);

	$: !isNaN(value) && fetchCustomers();

	const angle = tweened(90, { duration: 400 });
	const showCustomerInputFocusOpen = () => {
		if (isCustomerAddModal) customerInputFocus();
	};
	const customerInputFocus = () => {
		if (!readonly) {
			customerIsOpen = !customerIsOpen;
			angle.set(customerIsOpen ? 90 : 180);
		}
	};

	const chooseCustomer = (customer: any) => {
		value = customer.name;
		customerId = customer._id;
		mobileNumber = customer.mobileNumber;
		customerInputFocus();
	};
</script>

<div class="xl:col-span-6 relative z-100">
	<label for="customer" class="inline-block mb-2 text-base font-medium">Customer</label>

	<div class="flex items-center" use:clickOutside={showCustomerInputFocusOpen}>
		<input
			type="text"
			bind:value={customerId}
			id="customerId"
			name="customerId"
			placeholder="Customer Id"
			class="hidden"
		/>
		<input
			type="text"
			bind:value
			autocomplete="off"
			{readonly}
			on:click={customerInputFocus}
			on:keypress={() => isCustomerAddModal == true}
			id="customer"
			name="customer"
			placeholder="Customer"
			class="ltr:rounded-r-none read-only:bg-slate-100 dark:read-only:bg-zink-600 read-only:border-slate-300 dark:read-only:border-zink-500 dark:read-only:text-zink-200 read-only:text-slate-500 cursor-pointer rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
		/>
		<button
			type="button"
			on:click={customerInputFocus}
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
	{#if customerIsOpen}
		<section
			class="absolute w-full mt-1 flex flex-col gap-1/2"
			style="z-index: 10;"
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 250 }}
		>
			{#if customers.length > 0}
				{#each customers as customer}
					<button
						type="button"
						on:click={() => {
							chooseCustomer(customer);
						}}
						class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
					>
						{customer.name}
					</button>
				{/each}
			{:else}
				<div class="flex items-center">
					<input
						type="text"
						value="No Customer Found"
						placeholder="No Customer Found"
						class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					/>
					<button
						type="button"
						class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
						on:click={toggleAdd}
						><LucideIcon name="Plus" class="inline-block size-4" />
					</button>
				</div>
			{/if}
		</section>
	{/if}
	<p class="mt-1 text-sm text-slate-400 dark:text-zink-200">
		Choose the Customer for further Reference
	</p>
</div>

<Modal modal-center className="-translate-y-2/4" isOpen={isCustomerAddModal} toggle={toggleAdd}>
	<AddCustomer {toggleAdd} mobileNumber={value} {fetchCustomers} />
</Modal>
