<script lang="ts">
	import FlatPickr from '$lib/components/FlatPickr.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	import { HeadTitle, Breadcrumb, LucideIcon, Modal, UsersSelect } from '$lib/components';
	import { AddCustomer, DeleteCustomer, DeleteServiceCall, EditCustomer } from '$lib/widgets';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';
	import type { Installation, ServiceCall } from '$lib/types';
	import Flatpickr from 'svelte-flatpickr';
	import moment from 'moment';
	import { invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import ListServiceCall from '$lib/widgets/service-call/ListServiceCall.svelte';
	import ListInstallations from '$lib/widgets/installation/ListInstallations.svelte';

	let isAddModal = false;
	let isDeleteModal = false;
	let isEditModal = false;
	let selectedCustomer;
	let selectedServiceCall: ServiceCall;
	let selectedInstallation: Installation;
	let isAssignPeopleModel = false;

	const toggleAssignPeoples = () => (isAssignPeopleModel = !isAssignPeopleModel);
	const toggleAdd = () => (isAddModal = !isAddModal);
	const toggleEdit = () => (isEditModal = !isEditModal);
	const toggleDelete = () => (isDeleteModal = !isDeleteModal);
</script>

<HeadTitle title="Customer" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Customer" pagetitle="Heaven Automation" name={data.customer.name} />

	<div class="card" id="ordersTable">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">{data.customer.name}</h4>
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
				<div class="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
					<div class="xl:col-span-3">
						<div class="card">
							<div class="card-body">
								<div class="flex items-center gap-2 mb-4">
									<div class="grow">
										<button class="group/item toggle-button">
											<LucideIcon
												name="Pencil"
												class="size-5 text-slate-500 dark:text-zink-200 fill-slate-200 dark:fill-zink-500 transition-all duration-150 ease-linear group-[.active]/item:text-yellow-500 dark:group-[.active]/item:text-yellow-500 group-[.active]/item:fill-yellow-200 dark:group-[.active]/item:fill-yellow-500/20 group-hover/item:text-yellow-500 dark:group-hover/item:text-yellow-500 group-hover/item:fill-yellow-200 dark:group-hover/item:fill-yellow-500/20"
											/></button
										>
									</div>
								</div>
								<div
									class="flex items-center justify-center size-16 mx-auto rounded-full bg-slate-100 outline outline-slate-100 outline-offset-1 dark:bg-zink-600 dark:outline-zink-600"
								>
									<img src="/images/users/avatar-1.png" alt="" class="h-10 rounded-full" />
								</div>

								<div class="mt-4 mb-6 text-center">
									<h6 class="text-16">{data.customer.name}</h6>
									<p class="text-slate-500 dark:text-zink-200">{data.customer.mobileNumber}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="xl:col-span-9">
						<div class="card">
							<div class="card-body">
								<h4 class="text-15 grow mb-4">Service Calls</h4>
								<ListServiceCall serviceCalls={data.serviceCalls} authUser={data.authUser} />
								<div class="overflow-x-auto"></div>
								<h4 class="text-15 grow mb-4">Completed Installations</h4>
								<ListInstallations installations={data.installations} authUser={data.authUser} />
								<div class="overflow-x-auto"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.Customers)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isAddModal} toggle={toggleAdd}>
		<AddCustomer {toggleAdd} mobileNumber="" />
	</Modal>
{/if}

{#if hasPermission(data.authUser.permissions, PermissionTypes.Update, Modules.ServiceCalls)}
	<Modal
		modal-center
		className="-translate-y-2/4"
		isOpen={isAssignPeopleModel}
		toggle={toggleAssignPeoples}
	>
		<UsersSelect {toggleAssignPeoples} {selectedServiceCall} />
	</Modal>
{/if}

{#if hasPermission(data.authUser.permissions, PermissionTypes.Delete, Modules.ServiceCalls)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isDeleteModal} toggle={toggleDelete}>
		<DeleteServiceCall {toggleDelete} {selectedServiceCall} />
	</Modal>
{/if}
