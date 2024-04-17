<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import { HeadTitle, Breadcrumb, LucideIcon, Modal } from '$lib/components';

	import _ from 'lodash';
	import { page } from '$app/stores';
	import type { SvelteComponent } from 'svelte';
	import { Sessions, AddUser, ChangePassword, PermissionsTab } from '$lib/widgets';
	import { tooltip } from '@svelte-plugins/tooltips';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';

	let isAddModal = false;

	const toggleAdd = () => (isAddModal = !isAddModal);

	const tabContents: {
		name: String;
		value: String;
		isShow: Boolean;
		component: [typeof SvelteComponent, Object];
	}[] = [
		{
			name: 'Permissions',
			value: 'permissions',
			isShow: hasPermission(
				$page.data.authUser.permissions,
				PermissionTypes.Manage,
				Modules.Permissions
			),
			component: [PermissionsTab, { user: data?.user?._id, userPermissions: data.user.permissions }]
		},
		{
			name: 'Change Password',
			value: 'password',
			isShow: true,
			component: [ChangePassword, {}]
		},
		{
			name: 'Sessions',
			value: 'sessions',
			isShow: true,
			component: [Sessions, { sessions: data.sessions }]
		}
	];

	let tabContent = tabContents.filter((e) => e.isShow)[0].value;
</script>

<HeadTitle title="User" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="User" pagetitle="Heaven Automation" name={data.user.name} />
	<div class="card">
		<div class="card-body">
			<div class="grid grid-cols-1 gap-5 lg:grid-cols-12 2xl:grid-cols-12">
				<div class="lg:col-span-2 2xl:col-span-1">
					<div
						class="relative inline-block size-20 rounded-full shadow-md bg-slate-100 profile-user xl:size-28"
					>
						<img
							src="/images/users/avatar-1.png"
							alt=""
							class="object-cover border-0 rounded-full img-thumbnail user-profile-image"
						/>
						<div
							class="absolute bottom-0 flex items-center justify-center size-8 rounded-full ltr:right-0 rtl:left-0 profile-photo-edit"
						>
							<input
								id="profile-img-file-input"
								type="file"
								class="hidden profile-img-file-input"
							/>
							<label
								for="profile-img-file-input"
								class="flex items-center justify-center size-8 bg-white rounded-full shadow-lg cursor-pointer dark:bg-zink-600 profile-photo-edit"
							>
								<LucideIcon
									name="ImagePlus"
									class="size-4 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"
								/>
							</label>
						</div>
					</div>
				</div>
				<!--end col-->
				<div class="lg:col-span-10 2xl:col-span-9">
					<h5 class="mb-1">
						{data.user.name}
						{#if data.user.isActive}
							<button
								use:tooltip={{
									content: 'Active',
									position: 'top',
									animation: 'slide',
									arrow: true
								}}
							>
								<LucideIcon
									name="BadgeCheck"
									class="inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20"
								/>
							</button>
						{/if}
					</h5>
					<div class="flex gap-3 mb-4">
						<p class="text-slate-500 dark:text-zink-200">
							<LucideIcon
								name="UserCircle"
								class="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"
							/>
							{_.startCase(_.camelCase(data.user.type))}
						</p>
						<p class="text-slate-500 dark:text-zink-200">
							<LucideIcon
								name="MapPin"
								class="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"
							/>
							Trichy
						</p>
					</div>
					<p class="mt-4 text-slate-500 dark:text-zink-200">Description</p>
				</div>
				<div class="lg:col-span-12 2xl:col-span-2">
					<div class="flex gap-2 2xl:justify-end">
						<a
							href="mailto:{data.user.email}"
							class="flex items-center justify-center size-[37.5px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
						>
							<LucideIcon name="Mail" class="size-4" />
						</a>
						<a
							href="tel:{data.user.mobileNumber}"
							class="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
						>
							<LucideIcon name="Phone" class="size-4 inline-block mr-1" />
							Call
						</a>
						<!-- <Dropdown className="relative" direction="bottom-start">
							<DropdownToggle
								className="flex items-center justify-center size-[37.5px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
							>
								<LucideIcon name="MoreHorizontal" class="size-4" />
							</DropdownToggle>
							<DropdownMenu
								tag="ul"
								class="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600"
							>
								<li class="px-3 mb-2 text-sm text-slate-500">Payments</li>
								<li>
									<a
										class="block px-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
										href="#!">Create Invoice</a
									>
								</li>
								<li>
									<a
										class="block px-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
										href="#!">Pending Billing</a
									>
								</li>
								<li>
									<a
										class="block px-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
										href="#!">Genarate Bill</a
									>
								</li>
								<li>
									<a
										class="block px-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
										href="#!">Subscription</a
									>
								</li>
							</DropdownMenu>
						</Dropdown> -->
					</div>
				</div>
			</div>
			<!--end grid-->
		</div>
		<div class="card-body !py-0">
			<ul class="flex flex-wrap w-full text-sm font-medium text-center nav-tabs">
				{#each tabContents as { isShow, name, value }}
					{#if isShow}
						<li class="group {tabContent == value ? 'active' : ''}">
							<button
								on:click={() => (tabContent = value)}
								class="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md
					text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500
					dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500
					dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500
					-mb-[1px]">{name}</button
							>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</div>
<div class="card">
	<div class="card-body">
		{#each tabContents as { isShow, value, component }}
			{#if isShow && tabContent == value}
				<svelte:component this={component[0]} {...component[1]} />
			{/if}
		{/each}
	</div>
</div>

<Modal modal-center className="-translate-y-2/4" isOpen={isAddModal} toggle={toggleAdd}>
	<AddUser {toggleAdd} mobileNumber="" />
</Modal>
