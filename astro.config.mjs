// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://zyventowordcouter.com',
	integrations: [sitemap({
		filter: (page) => !page.endsWith('/404/') && !page.endsWith('/500/'),
	})],
	vite: {
		plugins: [tailwindcss()],
	},
});
