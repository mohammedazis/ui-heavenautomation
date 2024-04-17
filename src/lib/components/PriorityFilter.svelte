<script>
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { tweened } from 'svelte/motion';
	import { slide } from 'svelte/transition';

	let isUserOpen = false;
	let value = '';

	const angle = tweened(90, { duration: 400 });
	const inputFocus = () => {
		isUserOpen = !isUserOpen;
		angle.set(isUserOpen ? 90 : 180);
	};
    const clearQueryParams  = () => {
        // $page.url.searchParams.get("priority")
    }
</script>

<div>
	<div class="flex items-center">
        <button
			type="button"
			on:click={inputFocus}
			class="inline-block px-3 py-2 border border-r-0 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-l-md rtl:rounded-r-md"
			><svg
				style="transform: rotate({$angle}deg);"
				width="20"
				height="20"
				class="w-5 h-5"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
			></button
		>
		<input
			type="text"
			bind:value
			autocomplete="off"
			on:click={inputFocus}
			id="priority"
			name="priority"
			placeholder="Priority"
			class="ltr:rounded-r-none rtl:rounded-l-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
		/>

		<button
			type="button"
            on:click={clearQueryParams}
			class="inline-block px-3 py-2 border border-l-0 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-r-md rtl:rounded-l-md"
			><svg
				style="transform: rotate({$angle}deg);"
				width="20"
				height="20"
				class="w-5 h-5"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
			></button
		>
	</div>
	{#if isUserOpen}
		<section
			class="absolute w-full mt-1 flex flex-col gap-1/2"
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 250 }}
		>
			{#each ['High', 'Medium', 'Low'] as priority}
				<button
					on:click={() => {
						inputFocus();
						value = priority;   
						invalidateAll();
					}}
					type="submit"
					class="bg-white flex form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 overflow-hidden"
				>
					{priority}
				</button>
			{/each}
		</section>
	{/if}
</div>
