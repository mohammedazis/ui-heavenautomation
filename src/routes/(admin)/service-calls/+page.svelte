<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import { HeadTitle, Breadcrumb, LucideIcon } from '$lib/components';
	import { invalidateAll } from '$app/navigation';
	import type { ServiceCall } from '$lib/types';
	import { Modules, PermissionTypes, hasPermission } from '$lib/utils';
	import ListServiceCall from '$lib/widgets/service-call/ListServiceCall.svelte';
</script>

<HeadTitle title="Service Calls" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Service Calls" pagetitle="Heaven Automation" />
	<div class="card">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Service Calls</h4>
				{#if data.serviceCalls.length != 0}
					<button
						type="button"
						class="flex items-center justify-center size-[37.5px] p-0 text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20"
						on:click={() => invalidateAll()}
					>
						<LucideIcon name="RotateCw" class="size-4" />
					</button>
				{/if}
				{#if hasPermission(data.authUser.permissions, PermissionTypes.Create, Modules.ServiceCalls)}
					<div class="shrink-0">
						<a
							href="/service-calls/add"
							class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
							><LucideIcon name="Plus" class="inline-block size-4" />
							<span class="align-middle">Add Service Call</span></a
						>
					</div>
				{/if}
			</div>
			<ListServiceCall serviceCalls={data.serviceCalls} authUser={data.authUser} />
		</div>
	</div>
</div>
