
import { defineConfig, normalizePath } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: normalizePath(path.resolve("./")),
  server: {
    host: '0.0.0.0',
    port: 3001
	},
  resolve: {
		dedupe: ["svelte"],
		alias: {
			"@Data": path.resolve(__dirname, "src/Data/"),
		},
	},
  plugins: [svelte({
    preprocess: sveltePreprocess(),
  })],
})
