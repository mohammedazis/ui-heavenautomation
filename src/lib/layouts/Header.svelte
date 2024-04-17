<script>
	import { createEventDispatcher } from 'svelte';
	import {
		Drawer,
		LightDark,
		LucideIcon,
		NotificationDropdown,
		LanguageDropdown,
		ProfileDropdown
	} from '$lib/components';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	let isOpen = false;

	const toggleSidebar = () => {
		if (browser) {
			if (document.documentElement) {
				var windowSize = document.documentElement.clientWidth;
				var verticalOverlay = document.getElementById('sidebar-overlay');
				if (windowSize < 768) {
					document.body.classList.add('overflow-hidden');
					if (verticalOverlay.classList.contains('hidden')) {
						verticalOverlay.classList.remove('hidden');
						document.querySelector('.app-menu').classList.remove('hidden');
					}
					if (document.getElementById('sidebarSizelg')) {
						document.getElementById('sidebarSizelg').click();
					}
				} else {
					if (document.documentElement.getAttribute('data-sidebar-size') == 'sm') {
						if (document.getElementById('sidebarSizelg')) {
							document.getElementById('sidebarSizelg').click();
						}
					} else if (document.documentElement.getAttribute('data-sidebar-size') == 'lg') {
						if (document.getElementById('sidebarSizesm')) {
							document.getElementById('sidebarSizesm').click();
						}
					}
				}
			}
		}
	};
</script>

<header
	id="page-topbar"
	class="ltr:md:left-vertical-menu rtl:md:right-vertical-menu group-data-[sidebar-size=md]:ltr:md:left-vertical-menu-md group-data-[sidebar-size=md]:rtl:md:right-vertical-menu-md group-data-[sidebar-size=sm]:ltr:md:left-vertical-menu-sm group-data-[sidebar-size=sm]:rtl:md:right-vertical-menu-sm group-data-[layout=horizontal]:ltr:left-0 group-data-[layout=horizontal]:rtl:right-0 fixed right-0 z-[1000] left-0 print:hidden group-data-[navbar=bordered]:m-4 group-data-[navbar=bordered]:[&.is-sticky]:mt-0 transition-all ease-linear duration-300 group-data-[navbar=hidden]:hidden group-data-[navbar=scroll]:absolute group/topbar group-data-[layout=horizontal]:z-[1004]"
>
	<div class="layout-width">
		<div
			class="flex items-center px-4 mx-auto bg-topbar border-b-2 border-topbar group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-brand shadow-md h-header shadow-slate-200/50 group-data-[navbar=bordered]:rounded-md group-data-[navbar=bordered]:group-[.is-sticky]/topbar:rounded-t-none group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:border-zink-700 dark:shadow-none group-data-[topbar=dark]:group-[.is-sticky]/topbar:dark:shadow-zink-500 group-data-[topbar=dark]:group-[.is-sticky]/topbar:dark:shadow-md group-data-[navbar=bordered]:shadow-none group-data-[layout=horizontal]:group-data-[navbar=bordered]:rounded-b-none group-data-[layout=horizontal]:shadow-none group-data-[layout=horizontal]:dark:group-[.is-sticky]/topbar:shadow-none"
		>
			<div
				class="flex items-center w-full group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl navbar-header group-data-[layout=horizontal]:ltr:xl:pr-3 group-data-[layout=horizontal]:rtl:xl:pl-3"
			>
				<!-- LOGO -->
				<div
					class="items-center justify-center hidden px-5 text-center h-header group-data-[layout=horizontal]:md:flex group-data-[layout=horizontal]:ltr::pl-0 group-data-[layout=horizontal]:rtl:pr-0"
				>
					<a href="/">
						<span class="hidden">
							<img src="/images/logo-sm.png" alt="" class="h-6 mx-auto" />
						</span>
						<span class="group-data-[topbar=dark]:hidden group-data-[topbar=brand]:hidden">
							<img src="/images/logo-dark.png" alt="" class="h-6 mx-auto" />
						</span>
					</a>
					<a href="/" class="hidden group-data-[topbar=dark]:block group-data-[topbar=brand]:block">
						<span class="group-data-[topbar=dark]:hidden group-data-[topbar=brand]:hidden">
							<img src="/images/logo-sm.png" alt="" class="h-6 mx-auto" />
						</span>
						<span class="group-data-[topbar=dark]:block group-data-[topbar=brand]:block">
							<img src="/images/logo-light.png" alt="" class="h-6 mx-auto" />
						</span>
					</a>
				</div>

				<button
					type="button"
					on:click={toggleSidebar}
					class="inline-flex relative justify-center items-center p-0 text-topbar-item transition-all size-[37.5px] duration-75 ease-linear bg-topbar rounded-md btn hover:bg-slate-100 group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-dark group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-brand group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:text-zink-200 group-data-[topbar=dark]:dark:border-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[layout=horizontal]:flex group-data-[layout=horizontal]:md:hidden hamburger-icon"
					id="topnav-hamburger-icon"
				>
					<LucideIcon name="ChevronsLeft" class="size-5 group-data-[sidebar-size=sm]:hidden" />
					<LucideIcon
						name="ChevronsRight"
						class="hidden size-5 group-data-[sidebar-size=sm]:block"
					/>
				</button>

				<div
					class="relative hidden ltr:ml-3 rtl:mr-3 lg:block group-data-[layout=horizontal]:hidden group-data-[layout=horizontal]:lg:block"
				>
					<input
						type="text"
						class="py-2 pr-4 text-sm text-topbar-item bg-topbar border border-topbar-border rounded pl-8 placeholder:text-slate-400 form-control focus-visible:outline-0 min-w-[300px] focus:border-blue-400 group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-border-dark group-data-[topbar=dark]:placeholder:text-slate-500 group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-border-brand group-data-[topbar=brand]:placeholder:text-blue-300 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:border-zink-500 group-data-[topbar=dark]:dark:text-zink-100"
						placeholder="Search for ..."
						autocomplete="off"
					/>
					<LucideIcon
						name="Search"
						class="inline-block size-4 absolute left-2.5 top-2.5 text-topbar-item fill-slate-100 group-data-[topbar=dark]:fill-topbar-item-bg-hover-dark group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=brand]:fill-topbar-item-bg-hover-brand group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:text-zink-200 group-data-[topbar=dark]:dark:fill-zink-60"
					/>
				</div>

				<div class="flex gap-3 ms-auto">
					<LanguageDropdown />

					<LightDark />

					<!-- <NotificationDropdown /> -->

					<div class="relative items-center hidden h-header md:flex">
						<button
							on:click={() => {
								dispatch('rightsidebartoggle');
							}}
							type="button"
							class="inline-flex justify-center items-center p-0 text-topbar-item transition-all size-[37.5px] duration-200 ease-linear bg-topbar group-data-[topbar=dark]:text-topbar-item-dark rounded-md btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200"
						>
							<LucideIcon
								name="Settings"
								class="inline-block size-5 stroke-1 fill-slate-100 group-data-[topbar=dark]:fill-topbar-item-bg-hover-dark group-data-[topbar=brand]:fill-topbar-item-bg-hover-brand"
							/>
						</button>
					</div>
					<ProfileDropdown />
				</div>
			</div>
		</div>
	</div>
</header>
