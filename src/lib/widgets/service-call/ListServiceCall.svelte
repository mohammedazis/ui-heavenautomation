<script lang="ts">
	import RemarksInfoModal from '$lib/components/RemarksInfoModal.svelte';
	export let serviceCalls: ServiceCall[];
	export let authUser: AuthUser;
	import { LucideIcon, Modal, UsersSelect } from '$lib/components';
	import { CancelServiceCall, DeleteServiceCall } from '$lib/widgets';
	import type { AuthUser, ServiceCall } from '$lib/types';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';
	import moment from 'moment';
	import LocationModal from '$lib/components/LocationModal.svelte';
	import FlatPickr from '$lib/components/FlatPickr.svelte';
	let selectedServiceCall: ServiceCall;
	let isDeleteModal = false;
	let isLocationModel = false;
	let isAssignPeopleModel = false;
	let isCallCancelModel = false;
	let isRemarksInfoModel = false;
	let isDataInfoModel = false;

	const toggleLocation = () => (isLocationModel = !isLocationModel);
	const toggleDelete = () => (isDeleteModal = !isDeleteModal);
	const toggleAssignPeoples = () => (isAssignPeopleModel = !isAssignPeopleModel);
	const toggleCancel = () => (isCallCancelModel = !isCallCancelModel);
	const toggleRemarks = () => (isRemarksInfoModel = !isRemarksInfoModel);
	const toggleInfo = () => (isDataInfoModel = !isDataInfoModel);
</script>

{#if serviceCalls.length != 0}
	<div class="overflow-x-auto">
		<table class="w-2/3 whitespace-nowrap mx-auto">
			<thead class="ltr:text-left rtl:text-right">
				<tr>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>ID</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Created At</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Service</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Customer</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Next Service Date</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Assigned To</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Second Person</th
					>
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>Options</th
					>
				</tr>
			</thead>
			<tbody class="">
				{#if serviceCalls}
					{#each serviceCalls as serviceCall, idx}
						<tr>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">{idx + 1}</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="flex items-center gap-2">
									<button
										on:click={() => {
											toggleInfo();
											selectedServiceCall = serviceCall;
										}}
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
										><LucideIcon name="Info" class="size-4" /></button
									>
									{moment(serviceCall.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
								</div>
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="flex items-center gap-2">
									<button
										on:click={() => {
											toggleRemarks();
											selectedServiceCall = serviceCall;
										}}
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
										><LucideIcon name="Info" class="size-4" /></button
									>
									{serviceCall.service?.name}
								</div>
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="flex items-center gap-2">
									<a
										href="tel:+91{serviceCall.customer?.mobileNumber}"
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
										><LucideIcon name="Phone" class="size-4" /></a
									>
									<a href="/customers/{serviceCall.customer?._id}">
										{serviceCall.customer?.name}
									</a>
								</div>
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="xl:col-span-1 flex items-center gap-1">
									<FlatPickr
										isAdmin={authUser.type == 'admin'}
										date={serviceCall.nextServiceAt}
										type="service-calls"
										id={serviceCall._id}
									/>
								</div>
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								{#if serviceCall.assignedTo}
									<a href="/users/{serviceCall.assignedTo._id}">
										{serviceCall.assignedTo.name ?? ''}
									</a>
								{:else}
									Not Assigned Yet
								{/if}
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								{#if serviceCall.assignedToSecond}
									<a href="/users/{serviceCall.assignedToSecond._id}">
										{serviceCall.assignedToSecond.name ?? ''}
									</a>
								{:else}
									Not Assigned Yet
								{/if}
							</td>

							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="flex gap-2">
									{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.ServiceCalls)}
										{#if authUser.type == 'admin'}
											<button
												title="Assign Peoples"
												class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
												on:click={() => {
													toggleAssignPeoples();
													selectedServiceCall = serviceCall;
												}}><LucideIcon name="UsersRound" class="size-4" /></button
											>
											{#if serviceCall.details.isActive}
												<button
													title="Cancel Service Call"
													class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
													on:click={() => {
														toggleCancel();
														selectedServiceCall = serviceCall;
													}}><LucideIcon name="ShieldX" class="size-4" /></button
												>
											{/if}
										{/if}
										<a
											title="View Service Call"
											href="/service-calls/{serviceCall._id}"
											class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
											><LucideIcon name="Eye" class="size-4" /></a
										>
										{#if serviceCall.details.isActive}
											<a
												href="/service-calls/{serviceCall._id}/complete"
												title="Complete Service Call"
												class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
												><LucideIcon name="CircleCheckBig" class="size-4" /></a
											>
										{/if}
									{/if}
									{#if hasPermission(authUser.permissions, PermissionTypes.Delete, Modules.ServiceCalls)}
										<button
											title="Delete Service Call"
											class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
											on:click={() => {
												toggleDelete();
												selectedServiceCall = serviceCall;
											}}><LucideIcon name="Trash2" class="size-4" /></button
										>
									{/if}
									<button
										title="View Location"
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
										on:click={() => {
											toggleLocation();
											selectedServiceCall = serviceCall;
										}}><LucideIcon name="MapPin" class="size-4" /></button
									>
								</div>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
{:else}
	<div class="font-bold text-center">Nothing Found</div>
{/if}

{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.ServiceCalls)}
	<Modal
		modal-center
		className="-translate-y-2/4"
		isOpen={isAssignPeopleModel}
		toggle={toggleAssignPeoples}
	>
		<UsersSelect {toggleAssignPeoples} {selectedServiceCall} />
	</Modal>

	<Modal modal-center className="-translate-y-2/4" isOpen={isCallCancelModel} toggle={toggleCancel}>
		<CancelServiceCall {toggleCancel} {selectedServiceCall} />
	</Modal>
{/if}

<Modal modal-center className="-translate-y-2/4" isOpen={isDataInfoModel} toggle={toggleInfo}>
	<div class="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
		<div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
			<h5 class="text-16">Last Updated At</h5>
			<button
				class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
				on:click={toggleInfo}><LucideIcon name="X" class="size-5" /></button
			>
		</div>
		<div class="card">
			<div class="card-body">
				{moment(selectedServiceCall.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
			</div>
		</div>
	</div>
</Modal>

<Modal modal-center className="-translate-y-2/4" isOpen={isRemarksInfoModel} toggle={toggleRemarks}>
	<RemarksInfoModal {toggleRemarks} selected={selectedServiceCall} />
</Modal>

<Modal modal-center className="-translate-y-2/4" isOpen={isLocationModel} toggle={toggleLocation}>
	<LocationModal {toggleLocation} selected={selectedServiceCall} />
</Modal>

{#if hasPermission(authUser.permissions, PermissionTypes.Delete, Modules.ServiceCalls)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isDeleteModal} toggle={toggleDelete}>
		<DeleteServiceCall {toggleDelete} {selectedServiceCall} />
	</Modal>
{/if}
