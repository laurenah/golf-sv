import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 3000,
	},
	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}']
	}
});
