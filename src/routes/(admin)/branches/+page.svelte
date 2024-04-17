<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import { HeadTitle, Breadcrumb, LucideIcon, Modal } from '$lib/components';
	import { AddBranch, EditBranch } from '$lib/widgets';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';
	import { invalidateAll } from '$app/navigation';
	import type { Branch } from '$lib/types';

	let isAddModal = false;
	let isEditModal = false;

	let selectedBranch: Branch;

	const toggleAdd = () => (isAddModal = !isAddModal);
	const toggleEdit = () => (isEditModal = !isEditModal);
</script>

<HeadTitle title="Branches" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Users" pagetitle="Heaven Automation" />

	<div class="card">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Branches</h4>
				<button
					type="button"
					class="flex items-center justify-center size-[37.5px] p-0 text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20"
					on:click={() => invalidateAll()}
				>
					<LucideIcon name="RotateCw" class="size-4" />
				</button>
				{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.Users)}
					<div class="shrink-0">
						<button
							type="button"
							class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
							on:click={toggleAdd}
							><LucideIcon name="Plus" class="inline-block size-4" />
							<span class="align-middle">Add Branch</span></button
						>
					</div>
				{/if}
			</div>
			<div class="overflow-x-auto">
				{#if data.branches && data.branches.length != 0}
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
									>Branch Name</th
								>
								<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
									>Options</th
								>
							</tr>
						</thead>
						<tbody>
							{#each data.branches as branch, idx}
								<tr>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
										>{idx + 1}</td
									>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
										>{branch.name}</td
									>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
										>{branch.branchName}</td
									>
									<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
										<div class="flex gap-2">
											{#if hasPermission(data.authUser.permissions, PermissionTypes.Update, Modules.Branches)}
												<button
													class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20"
													on:click={() => {
														toggleEdit();
														selectedBranch = branch;
													}}><LucideIcon name="Pencil" class="size-4" /></button
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

{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.Users)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isEditModal} toggle={toggleEdit}>
		<EditBranch {toggleEdit} branch={selectedBranch} />
	</Modal>
{/if}
{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.Users)}
	<Modal modal-center className="-translate-y-2/4" isOpen={isAddModal} toggle={toggleAdd}>
		<AddBranch {toggleAdd} />
	</Modal>
{/if}
