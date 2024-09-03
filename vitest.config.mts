import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  base : "/",
  plugins : [tsconfigPaths(), react()],
  test : {
    environment : 'jsdom',
    alias : {
      //@ts-expect-error
      "@" : fileURLToPath(new URL("./", import.meta.url))
    },
    coverage : {
      provider : 'istanbul' // or 'v8'
      , reporter : ['text', 'json', 'html'],
    },
    pool : 'forks',
    // reporters: ['html'],
    // poolOptions: {
    //   forks: {
    //     singleFork: true,
    //   },
    // },
  },
})
