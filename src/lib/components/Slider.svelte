<script lang="ts">
	export let duration: Number;
	export let slides: string[];
	export let description: string;
	let currentSlide = 0;
	const nextSlide = () => {
		currentSlide++;
		if (currentSlide >= slides.length) {
			currentSlide = 0;
		}
		timer();
	};
	const prevSlide = () => {
		currentSlide--;
		if (currentSlide <= 0) {
			currentSlide = slides.length - 1;
		}
		timer();
	};
	const goToSlide = (i) => {
		currentSlide = i;
		timer();
	};
	let interval;
	const timer = () => {
		clearInterval(interval);
		interval = setInterval(nextSlide, duration);
	};
	timer();
</script>

<div class="relative overflow-hidden rounded-md group/gallery w-3/5 h-2/5">
	<div class="overflow-hidden">
		{#each slides as slide, i}
			{#if currentSlide === i}
				<img
					src="https://api.heavenautomation.digipl.us/uploads/{slide}"
					alt=""
					class="transition-all duration-300 ease-linear group-hover/gallery:scale-110"
				/>
			{/if}
		{/each}
	</div>
	{#if description}
		<div class="pt-3">
			<p class="text-slate-500 dark:zink-200">
				{description}
			</p>
		</div>
	{/if}
	<!-- </div> -->
</div>
{#if slides.length > 1}
	<button
		class="absolute z-20 top-1/2 transform bg-transparent px-2 py-4 rounded cursor-pointer left-20"
		on:click={nextSlide}>Next</button
	>
	<button
		class="absolute z-20 top-1/2 transform bg-transparent px-2 py-4 rounded cursor-pointer right-20"
		on:click={prevSlide}>Prev</button
	>
{/if}
