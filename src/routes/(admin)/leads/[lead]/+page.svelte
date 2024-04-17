<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card">
	<div class="card-body items-center flex flex-col justify-center w-auto">
		<Slider slides={data.lead.files} duration={10000} description={data.lead.description} />
	</div>
</div>
