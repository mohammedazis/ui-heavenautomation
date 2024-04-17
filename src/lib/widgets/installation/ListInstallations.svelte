<script lang="ts">
	export let installations: Installation[];
	export let authUser: AuthUser;
	import {
		HeadTitle,
		Breadcrumb,
		LucideIcon,
		Modal,
		UsersSelectInstallation
	} from '$lib/components';
	import 'flatpickr/dist/flatpickr.css';
	import { invalidateAll } from '$app/navigation';
	import { DeleteInstallation, EditInstallation } from '$lib/widgets';
	import type { AuthUser, Installation } from '$lib/types';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';
	import moment from 'moment';
	import FlatPickr from '$lib/components/FlatPickr.svelte';
	import LocationModal from '$lib/components/LocationModal.svelte';

	let selectedInstallation: Installation;
	let isDeleteModal = false;
	let isEditModal = false;
	let isAssignPeopleModel = false;

	const toggleDelete = () => (isDeleteModal = !isDeleteModal);

	let isLocationModel = false;
	const toggleLocation = () => (isLocationModel = !isLocationModel);
	const toggleAssignPeoples = () => (isAssignPeopleModel = !isAssignPeopleModel);
	const toggleEdit = () => (isEditModal = !isEditModal);
</script>

{#if installations.length != 0}
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
						>Date</th
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
				{#if installations}
					{#each installations as installation, idx}
						<tr>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">{idx + 1} </td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								{moment(installation.createdAt).format('do MMMM')}
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								{installation.service?.name}
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="flex items-center gap-2">
									<a
										href="tel:+91{installation.customer?.mobileNumber}"
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
										><LucideIcon name="Phone" class="size-4" /></a
									>
									<a href="/customers/{installation.customer?._id}">
										{installation.customer?.name}
									</a>
								</div>
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="xl:col-span-1 flex gap-2 items-center">
									<FlatPickr
										isAdmin={authUser.type == 'admin'}
										date={installation.nextServiceAt}
										type="installations"
										id={installation._id}
									/>
								</div>
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								{#if installation.assignedTo}
									<a href="/users/{installation.assignedTo._id}">
										{installation.assignedTo.name ?? ''}
									</a>
								{:else}
									Not Assigned Yet
								{/if}
							</td>
							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								{#if installation.assignedToSecond}
									<a href="/users/{installation.assignedToSecond._id}">
										{installation.assignedToSecond.name ?? ''}
									</a>
								{:else}
									Not Assigned Yet
								{/if}
							</td>

							<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
								<div class="flex gap-2">
									{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.Installations)}
										<button
											class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
											on:click={() => {
												toggleAssignPeoples();
												selectedInstallation = installation;
											}}><LucideIcon name="UsersRound" class="size-4" /></button
										>
										<button
											class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
											on:click={() => {
												toggleEdit();
												selectedInstallation = installation;
											}}><LucideIcon name="Edit" class="size-4" /></button
										>
										<!-- <a
										href="/installations/{installation._id}"
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
										><LucideIcon name="Eye" class="size-4" /></a
									> -->
										{#if installation.completed}
											{#if installation.serviceCall}
												<a
													href="/service-calls/{installation.serviceCall._id}"
													title="Go to Service Call"
													class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
													><LucideIcon name="ServerCog" class="size-4" /></a
												>
											{/if}
										{:else}
											<a
												href="/installations/{installation._id}/complete"
												title="Complete"
												class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
												><LucideIcon name="CircleCheckBig" class="size-4" /></a
											>
										{/if}
									{/if}
									{#if hasPermission(authUser.permissions, PermissionTypes.Delete, Modules.Installations)}
										<button
											class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
											on:click={() => {
												toggleDelete();
												selectedInstallation = installation;
											}}><LucideIcon name="Trash2" class="size-4" /></button
										>
									{/if}
									<button
										class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
										on:click={() => {
											toggleLocation();
											selectedInstallation = installation;
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

{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.Installations)}
	<Modal
		modal-center
		className="-translate-y-2/4"
		isOpen={isAssignPeopleModel}
		toggle={toggleAssignPeoples}
	>
		<UsersSelectInstallation {toggleAssignPeoples} {selectedInstallation} />
	</Modal>
	<Modal modal-center className="-translate-y-2/4" isOpen={isEditModal} toggle={toggleEdit}>
		<EditInstallation {toggleEdit} {selectedInstallation} />
	</Modal>
{/if}

{#if hasPermission(authUser.permissions, PermissionTypes.Delete, Modules.Installations)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isDeleteModal} toggle={toggleDelete}>
		<DeleteInstallation {toggleDelete} {selectedInstallation} />
	</Modal>
{/if}

<Modal modal-center className="-translate-y-2/4" isOpen={isLocationModel} toggle={toggleLocation}>
	<LocationModal {toggleLocation} selected={selectedInstallation} />
</Modal>
