<script lang="ts">
	import { page } from '$app/stores';
	import { HeadTitle, LucideIcon } from '$lib/components';
	import { classList } from 'svelte-body';
</script>

<svelte:body
	use:classList={'flex items-center justify-center min-h-screen py-16 bg-cover bg-auth-pattern dark:bg-auth-pattern-dark font-public'}
/>

<HeadTitle title="404" />

<div class="mb-0 border-none shadow-none lg:w-[500px] card bg-white/70 dark:bg-zink-500/70">
	<div class="!px-10 !py-12 card-body">
		<a href="/">
			<img src="/images/logo-light.png" alt="" class="hidden h-12 mx-auto dark:block" />
			<img src="/images/logo-dark.png" alt="" class="block h-12 mx-auto dark:hidden" />
		</a>

		<div class="mt-10">
			<img src="/images/auth/coming-soon.png" alt="" class="h-64 mx-auto" />
		</div>
		<div class="mt-8 text-center">
			<h4 class="mb-2 text-purple-500">{$page.status}</h4>
			<p class="mb-6 text-slate-500 dark:text-zink-200">
				{$page.error?.message}
			</p>
			<a
				href="/"
				class="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
				><LucideIcon name="Home" class="inline-block size-3 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle">Back to Home</span></a
			>
		</div>
	</div>
</div>
