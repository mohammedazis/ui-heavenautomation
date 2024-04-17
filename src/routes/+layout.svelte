<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.scss';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import toast, { Toaster } from 'svelte-french-toast';
	import { ToastMSGs } from '$lib/utils';
	import _ from 'lodash';
	// import { Toaster, toast } from 'svelte-sonner';

	const flash = getFlash(page);

	$: if ($flash) {
		if ($flash.type == ToastMSGs.SUCCESS) {
			Array.isArray($flash.message)
				? $flash.message.map((msg, idx) => {
						toast.success(_.startCase(msg), {
							position: 'top-right',
							duration: idx * 100 + 2000
						});
					})
				: toast.success($flash.message, {
						position: 'top-right',
						duration: 2000
					});
		} else {
			Array.isArray($flash.message)
				? $flash.message.map((msg, idx) => {
						const duration = idx * 500 + 2000;
						toast.error(_.startCase(msg), {
							position: 'top-right',
							duration
						});
					})
				: toast.error($flash.message, {
						duration: 2000,
						position: 'top-right'
					});
		}

		$flash = undefined;
	}
</script>

<Toaster />
<slot />
<div
	class="fixed inset-0 bg-slate-900/40 dark:bg-zink-800/70 z-[1049] backdrop-overlay hidden"
	id="backDropDiv"
></div>
