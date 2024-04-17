<script lang="ts">
	import moment from 'moment';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import toast from 'svelte-french-toast';
	import { LucideIcon } from '.';
	import { page } from '$app/stores';
	export let date: any;
	export let isAdmin: boolean;
	let dd = '';
	export let id: any;
	export let type: any;
</script>

{#if isAdmin}
	<Flatpickr
		options={{
			dateFormat: 'd-m-Y',
			minDate: 'today'
		}}
		on:change={(e) => {
			dd = e.detail[1];
		}}
		value={date}
		name="nextServiceAt"
		class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
		placeholder="Select date"
	/>
	<button
		class="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
		on:click={async () => {
			const reqBody = {
				id,
				nextServiceAt: moment(dd, 'DD-MM-YYYY').format('DD-MM-YYYY'),
				user: $page.data.authUser?._id
			};

			const reqq = await fetch(`/api/${type}/service-at`, {
				method: 'POST',
				body: JSON.stringify(reqBody)
			});
			const resp = await reqq.json();

			if (resp.statusCode == 400 || resp.statusCode == 409) {
				toast.error(resp.message, {
					position: 'top-right'
				});
			}
			toast.success(resp.message, {
				position: 'top-right'
			});
		}}><LucideIcon name="LayoutDashboard" class="size-4" /></button
	>
{:else}
	{moment(date).format('DD-MM-YYYY')}
{/if}
