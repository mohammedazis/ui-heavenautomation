<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import { HeadTitle, Breadcrumb, LucideIcon, Modal } from '$lib/components';
	import { AddCustomer, DeleteCustomer, EditCustomer } from '$lib/widgets';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';
	import type { Customer } from '$lib/types';
	import { invalidateAll } from '$app/navigation';

	let isAddModal = false;
	let isDeleteModal = false;
	let isEditModal = false;

	let selectedCustomer: Customer;

	const toggleAdd = () => (isAddModal = !isAddModal);
	const toggleEdit = () => (isEditModal = !isEditModal);
	const toggleDelete = () => (isDeleteModal = !isDeleteModal);
</script>

<HeadTitle title="Customers" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Customers" pagetitle="Heaven Automation" />

	<div class="card" id="ordersTable">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Customers</h4>
				<button
					type="button"
					class="flex items-center justify-center size-[37.5px] p-0 text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20"
					on:click={() => invalidateAll()}
				>
					<LucideIcon name="RotateCw" class="size-4" />
				</button>
				{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.Customers)}
					<div class="shrink-0">
						<button
							type="button"
							class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
							on:click={toggleAdd}
							><LucideIcon name="Plus" class="inline-block size-4" />
							<span class="align-middle">Add Customer</span></button
						>
					</div>
				{/if}
			</div>
			<div class="overflow-x-auto">
				{#if data.customers.length != 0}
					<table class="w-2/3 whitespace-nowrap mx-auto">
						<thead class="ltr:text-left rtl:text-right">
							<tr>
								<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
									>ID</th
								>
								<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
									>Name</th
								>
								<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
									>Mobile Number</th
								>
								<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
									>Options</th
								>
							</tr>
						</thead>
						<tbody>
							{#each data.customers as customer, idx}
								<tr>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
										>{idx + 1}</td
									>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
										>{customer.name}</td
									>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
										>{customer.mobileNumber}</td
									>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
										<div class="flex gap-2">
											{#if hasPermission(data.authUser.permissions, PermissionTypes.Read, Modules.Customers)}
												<a
													href="/customers/{customer._id}"
													class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
													><LucideIcon name="Eye" class="size-4" /></a
												>
											{/if}
											{#if hasPermission(data.authUser.permissions, PermissionTypes.Update, Modules.Customers)}
												<button
													class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
													on:click={() => {
														toggleEdit();
														selectedCustomer = customer;
													}}><LucideIcon name="Pencil" class="size-4" /></button
												>
											{/if}
											{#if hasPermission(data.authUser.permissions, PermissionTypes.Delete, Modules.Customers)}
												<button
													class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
													on:click={() => {
														toggleDelete();
														selectedCustomer = customer;
													}}><LucideIcon name="Trash2" class="size-4" /></button
												>
											{/if}
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
		</div>
	</div>
</div>

{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.Customers)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isAddModal} toggle={toggleAdd}>
		<AddCustomer {toggleAdd} mobileNumber="" />
	</Modal>
{/if}
{#if hasPermission(data.authUser.permissions, PermissionTypes.Delete, Modules.Customers)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isDeleteModal} toggle={toggleDelete}>
		<DeleteCustomer {toggleDelete} customer={selectedCustomer} />
	</Modal>
{/if}

{#if hasPermission(data.authUser.permissions, PermissionTypes.Update, Modules.Customers)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isEditModal} toggle={toggleEdit}>
		<EditCustomer {toggleEdit} customer={selectedCustomer} />
	</Modal>
{/if}
