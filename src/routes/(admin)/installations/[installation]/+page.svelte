<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { HeadTitle, Breadcrumb, LucideIcon } from '$lib/components';
	import moment from 'moment';
	import Modal from '$lib/components/Modal.svelte';
	import type { Installation, InstallationData, ServiceCallData } from '$lib/types';
	import Slider from '$lib/components/Slider.svelte';
	let isServiceCallDataImgModal = false;

	let selectedInstallationData: InstallationData;

	const toggleInstallationDataImgModal = () =>
		(isServiceCallDataImgModal = !isServiceCallDataImgModal);
</script>

<HeadTitle title="Installation Data" />

<div class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto relative">
	<Breadcrumb title="Installation Data" pagetitle="Heaven Automation" />

	<div class="card" id="ordersTable">
		<div class="card-body">
			<div class="flex items-center gap-3 mb-4">
				<h4 class="text-15 grow">Edit</h4>
				<div class="shrink-0">//</div>
			</div>
		</div>
	</div>
</div>

<Modal
	modal-center
	className="-translate-y-2/4"
	fullscreen={true}
	isOpen={isServiceCallDataImgModal}
	toggle={toggleInstallationDataImgModal}
>
	<div class="card">
		<div class="card-body items-center flex flex-col justify-center w-auto">
			<Slider
				slides={selectedInstallationData.files}
				duration={10000}
				description={selectedInstallationData.remarks}
			/>
		</div>
	</div>
</Modal>
