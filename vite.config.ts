import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	// server: {
	// 	proxy: {
	// 		'/admin': 'https://api.heavenautomation.com/'
	// 	}
	// },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
