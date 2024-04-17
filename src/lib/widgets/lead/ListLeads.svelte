<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { LocationModal, LucideIcon, Modal } from '$lib/components';
	import type { AuthUser, District, Lead, Service } from '$lib/types';
	import {
		Modules,
		PermissionTypes,
		capitalizeFirstLetter,
		hasPermission
	} from '$lib/utils/functions';
	import DeleteLead from './DeleteLead.svelte';
	import AddLead from './AddLead.svelte';
	import ConvertLead from './ConvertLead.svelte';
	import EditLead from './EditLead.svelte';
	import UploadLead from './UploadLead.svelte';
	import UpdateLocationLead from './UpdateLocationLead.svelte';
	import InfoModal from '$lib/components/InfoModal.svelte';

	export let leads: Lead[];
	export let services: Service[];
	export let districts: District[];
	export let authUser: AuthUser;

	let isAddModal = false;
	let isConvertModal = false;
	let isDeleteModal = false;
	let isEditModal = false;
	let isLocationModel = false;
	let isInfoModel = false;
	let isUploadModal = false;
	let isLocationUpdateModal = false;
	let selectedLead: Lead;

	const toggleConvert = () => (isConvertModal = !isConvertModal);
	const toggleAdd = () => (isAddModal = !isAddModal);
	const toggleEdit = () => (isEditModal = !isEditModal);
	const toggleDelete = () => (isDeleteModal = !isDeleteModal);
	const toggleUpload = () => (isUploadModal = !isUploadModal);
	const toggleLocation = () => (isLocationModel = !isLocationModel);
	const toggleLocationUpdate = () => (isLocationUpdateModal = !isLocationUpdateModal);
	const toggleInfo = () => (isInfoModel = !isInfoModel);
</script>

<div class="overflow-x-auto">
	<table class="w-2/3 whitespace-nowrap mx-auto">
		<thead class="ltr:text-left rtl:text-right">
			<tr>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500">ID</th>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Priority</th
				>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Assigned To
				</th>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Contact Person
				</th>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500">
					Company Name
				</th>

				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Options</th
				>
			</tr>
		</thead>
		<tbody class="">
			{#if leads}
				{#each leads as lead, idx}
					<tr>
						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">{idx + 1}</td>
						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
							<div class="flex">
								<a
									href="?priority={lead.priority}"
									class:high={lead.priority == 'high'}
									class:medium={lead.priority == 'medium'}
									class:low={lead.priority == 'low'}
									on:click={() => invalidateAll()}
									class="px-2.5 py-0.5 text-xs font-medium inline-block rounded border transition-all duration-200 ease-linear dark:border-transparent"
								>
									{capitalizeFirstLetter(lead.priority)}
								</a>
								<button
									title="Edit the Lead"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleInfo();
										selectedLead = lead;
									}}><LucideIcon name="Info" class="size-4" /></button
								>
							</div>
						</td>
						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
							{lead.assignedTo?.name}
						</td>
						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
							<a href="tel:{lead.contactPerson?.mobileNumber}">
								{lead.contactPerson?.name} /
								{lead.contactPerson?.mobileNumber}
							</a>
						</td>
						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
							{lead.companyName}
						</td>

						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
							<div class="flex gap-2">
								<a
									href="/leads/{lead._id}"
									title="GO to Lead"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									><LucideIcon name="Eye" class="size-4" /></a
								>
								<a
									href="tel:{lead.contactPerson?.mobileNumber}"
									title="Call the Lead"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									><LucideIcon name="Phone" class="size-4" /></a
								>
								<button
									title="Upload the Lead"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleUpload();
										selectedLead = lead;
									}}><LucideIcon name="Upload" class="size-4" /></button
								>
								<button
									title="Edit the Lead"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleEdit();
										selectedLead = lead;
									}}><LucideIcon name="Edit" class="size-4" /></button
								>
								<button
									title="Update the Live Location"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleLocationUpdate();
										selectedLead = lead;
									}}><LucideIcon name="Antenna" class="size-4" /></button
								>
								<button
									title="Delete the Lead"
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleDelete();
										selectedLead = lead;
									}}><LucideIcon name="Trash2" class="size-4" /></button
								>
								<button
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleLocation();
										selectedLead = lead;
									}}><LucideIcon name="MapPin" class="size-4" /></button
								>
								<button
									class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
									on:click={() => {
										toggleConvert();
										selectedLead = lead;
									}}><LucideIcon name="MessageSquareShare" class="size-4" /></button
								>
							</div>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.Leads)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isConvertModal} toggle={toggleConvert}>
		<ConvertLead {toggleConvert} lead={selectedLead} />
	</Modal>
{/if}

{#if hasPermission(authUser.permissions, PermissionTypes.Create, Modules.Leads)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isAddModal} toggle={toggleAdd}>
		<AddLead {toggleAdd} leadName="" />
	</Modal>
{/if}

{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.Leads)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isUploadModal} toggle={toggleUpload}>
		<UploadLead lead={selectedLead} {toggleUpload} />
	</Modal>
{/if}

{#if hasPermission(authUser.permissions, PermissionTypes.Update, Modules.Leads)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isEditModal} toggle={toggleEdit}>
		<EditLead
			{districts}
			{services}
			lead={selectedLead}
			isAdmin={authUser.type == 'admin'}
			{toggleEdit}
		/>
	</Modal>
{/if}

{#if hasPermission(authUser.permissions, PermissionTypes.Delete, Modules.Leads)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isDeleteModal} toggle={toggleDelete}>
		<DeleteLead {toggleDelete} lead={selectedLead} />
	</Modal>
{/if}

<Modal
	modal-center
	className="-translate-y-2/4"
	isOpen={isLocationUpdateModal}
	toggle={toggleLocationUpdate}
>
	<UpdateLocationLead toggleUpdateLocation={toggleLocationUpdate} lead={selectedLead} />
</Modal>

<Modal modal-center className="-translate-y-2/4" isOpen={isLocationModel} toggle={toggleLocation}>
	<LocationModal {toggleLocation} selected={selectedLead} />
</Modal>

<Modal modal-center className="-translate-y-2/4" isOpen={isInfoModel} toggle={toggleInfo}>
	<InfoModal {toggleInfo} selected={selectedLead} />
</Modal>

<style lang="scss">
	.medium {
		@apply bg-green-500 border-green-500 text-green-50 hover:bg-green-400;
	}
	.low {
		@apply bg-purple-500 border-purple-500 text-purple-50 hover:bg-purple-400;
	}
	.high {
		@apply bg-red-500 border-red-500 text-red-50 hover:bg-red-400;
	}
</style>
