<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { LucideIcon } from '$lib/components';
	import toast from 'svelte-french-toast';
	import _ from 'lodash';
	import { Modules, PermissionTypes } from '$lib/utils';

	export let userPermissions: String[];
	export let user: String;
	let showLoadingIndicator: boolean;

	const modules = Object.values(Modules);
	const permissions = Object.values(PermissionTypes);

	const getPermissions = async () => {
		showLoadingIndicator = true;
		const permissions = Array.from(document.getElementsByName('permissions'));
		const filteredPermissions = permissions
			.filter((e) => e.checked)
			.map((permission) => permission.id);

		const req = await fetch(`/api/users/permissions`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: user,
				permissions: filteredPermissions
			})
		});

		const resp = await req.json();
		showLoadingIndicator = false;
		invalidateAll();

		toast.success(resp.message, {
			position: 'top-right'
		});
	};
</script>

<h4 class="text-15 grow mb-4">Permissions</h4>
<div class="overflow-x-auto">
	<table class="w-2/3 whitespace-nowrap mx-auto">
		<thead class="ltr:text-left rtl:text-right">
			<tr>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Name</th
				>
				{#each permissions as permission}
					<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
						>{_.upperFirst(permission)}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each modules as module}
				<tr>
					<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
						>{_.upperFirst(module)}</td
					>
					{#each permissions as permission}
						<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
							<div class="flex items-center gap-2">
								<input
									id="{permission}:{module}"
									name="permissions"
									class="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
									type="checkbox"
									value=""
									checked={userPermissions.includes(`${permission}:${module}`)}
								/>
								<label for="{permission}:{module}" class="align-middle">
									{_.upperFirst(permission)}
								</label>
							</div>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="flex flex-wrap items-center justify-end gap-2 shrink-0">
		<button
			type="submit"
			on:click={getPermissions}
			class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
		>
			<LucideIcon name="Store" class="inline-block size-4" />
			<span class="align-middle"> {!showLoadingIndicator ? 'Update' : 'Updating'} Permissions</span>
			{#if showLoadingIndicator}
				<svg
					class="inline-block size-4 ltr:ml-2 rtl:mr-2 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			{/if}</button
		>
	</div>
</div>
