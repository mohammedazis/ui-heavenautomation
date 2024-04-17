<script lang="ts">
	import { enhance } from '$app/forms';
	import { Breadcrumb, HeadTitle } from '$lib/components';
	import { updateFlash } from 'sveltekit-flash-message';
	import type { ActionData, PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: ActionData;
</script>

<HeadTitle title="Search Users" />
<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Search Users" pagetitle="Heaven Automation" />
	<div class="card">
		<div class="card-body">
			<h4 class="text-center">Search Users</h4>

			<form method="POST" action="/search?/users" use:enhance>
				<div class="grid grid-cols-1 gap-4 xl:grid-cols-6">
					<div class="xl:col-span-6">
						<label for="mobileNumber" class="inline-block mb-2 text-base font-medium"
							>Mobile Number</label
						>
						<input
							type="text"
							name="mobileNumber"
							id="mobileNumber"
							class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
							placeholder="Mobile Number"
						/>
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<button
							type="submit"
							class="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
							>Search</button
						>
					</div>
			</form>
		</div>
	</div>
</div>
