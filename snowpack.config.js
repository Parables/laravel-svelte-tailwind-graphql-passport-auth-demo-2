/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
     //! Mount Laravel Resources
     "resources/js": { url: '/js' },
     },
     plugins: [
         '@snowpack/plugin-svelte',
         '@snowpack/plugin-dotenv',
         '@snowpack/plugin-postcss',
         [
         '@snowpack/plugin-typescript',
         {
             /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
             ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
         },
         ],
     ],
     /*  alias: {
         //? Useful for Using In Imports ie: @/RelativeFile.vue
         '@': './resources/js',
     }, */
     routes: [
         /* Enable an SPA Fallback in development: */
         // {"match": "routes", "src": ".*", "dest": "/index.html"},
     ],
     optimize: {
         /* Example: Bundle your final build: */
         // "bundle": true,
     },
     packageOptions: {
         /* ... */
     },
     devOptions: {
         tailwindConfig: './tailwind.config.js',
         hmr: true,//! enable hot reload, make sure to add import.meta.hot in app.js
         hmrDelay: 300, //! needed delay so we can see tailwind classes change during HMR
         // hmrErrorOverlay: true //// Not working
     },
         //TODO: set clean true, and out to public/dist
     //! when dev we cannot load other /_snowpack/pkg
     //! should be pointed to /dist/_snowpack
     buildOptions: {
         out: 'public',//laravel public folder
         clean: false, //! setting true will delete neccessary files in laravel public folder
         metaUrlPath: '_snowpack',
     },
     optimize: {
         minify: true,
         //! If Needed to Use Some Options Below Uncomment This
         // entrypoints: ['./resources/js/app.js'],
     //? Can Be Used to Target ES version
         // target: "es2020",
         // sourcemap: "inline", //// Not Working
         // splitting: true, //// Not Working
         // treeshake: true, //// Not Working
     },
 };
