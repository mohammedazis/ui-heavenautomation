<script lang="ts">
	export let sessions: {}[];

	import { HeadTitle, Breadcrumb, LucideIcon, Modal } from '$lib/components';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';

	let isDeleteModal = false;
	const toggleDelete = () => (isDeleteModal = !isDeleteModal);
	let selectedSession: String;

	const deleteSession = async () => {
		const re = await fetch('/api/users/session', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: selectedSession
			})
		});

		const data = await re.json();

		toast.success(data.message, {});

		toggleDelete();
	};
</script>

<HeadTitle title="Sessions - Users" />

<div class="flex items-center gap-3 mb-4">
	<h6 class="text-15 grow">{$page.data.user.name}</h6>
</div>

<div class="overflow-x-auto">
	<table class="w-1/3 whitespace-nowrap">
		<thead class="ltr:text-left rtl:text-right">
			<tr>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Expires At</th
				>
				<th class="px-3.5 py-2.5 font-semibold border border-slate-200 dark:border-zink-500"
					>Action</th
				>
			</tr>
		</thead>
		<tbody class="list">
			{#each sessions as session}
				<tr>
					<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500"
						>{session.expiresAt}</td
					>
					<td class="px-3.5 py-2.5 border border-slate-200 dark:border-zink-500">
						<div class="flex gap-2">
							<button
								class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:text-red-500 dark:hover:bg-red-500/20"
								on:click={() => {
									selectedSession = session._id;
									toggleDelete();
								}}><LucideIcon name="Trash2" class="size-4" /></button
							>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<Modal modal-center className="-translate-y-2/4" isOpen={isDeleteModal} toggle={toggleDelete}>
	<div class="w-screen md:w-[25rem] bg-white shadow rounded-md dark:bg-zink-600">
		<div class="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto px-6 py-8">
			<div class="float-right">
				<button
					class="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
					on:click={toggleDelete}><LucideIcon name="X" class="size-5" /></button
				>
			</div>
			<img src="/images/delete.png" alt="" class="block h-12 mx-auto" />
			<div class="mt-5 text-center">
				<h5 class="mb-1">Are you sure?</h5>
				<p class="text-slate-500 dark:text-zink-200">
					Are you certain you want to delete this session?
				</p>
				<div class="flex justify-center gap-2 mt-6">
					<button
						type="reset"
						class="bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-600 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10"
						on:click={toggleDelete}>Cancel</button
					>
					<button
						type="submit"
						on:click={deleteSession}
						class="text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
						>Yes, Delete It!</button
					>
				</div>
			</div>
		</div>
	</div>
</Modal>
