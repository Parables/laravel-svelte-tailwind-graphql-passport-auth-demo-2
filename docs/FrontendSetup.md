## Setting up Laravel + Inertia + Svelte + TailwindCss + Snowpack
Laravel is a powerful battle-tested web framework for building high performant web apps. Its like a toolbox with everything you need to create amazing apps.

Powered by PHP, Laravel is capable of building any complex web app but most developers tend to come from the JS world so the y get intemidated by PHP.

Don't worry, you can still use your favourite Frontend tech with Laravel. Laravel bonds perfectly with [Vue JS](). And if Vue is not your favourite, you can use any of the popular Forntend frameworks like [React](), [Angular]() or [Svelte]() with Laravel, powered by [Inertia]()

This guide will help you setup this amazing union.

> Prerequiste: Please follow the [Get Started guide]() in the README.md of this repo to get the base setup

If you have done that already, then let the union begin :confettite:
1. Install Inertia for Laravel
    ```sh
    composer require inertiajs/inertia-laravel
    ```

2. Paste the following in `resources/views/app.balde.php`
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
        <script src="{{ mix('/js/app.js') }}" defer></script>
    </head>
    <body>
        @inertia
    </body>
    </html>
    ```

3. Setup the Inertia Middleware
    ```sh
    php artisan inertia:middleware
    ```
    Add the `HandleInertiaRequests` as the last item in the web middleware group inside the `App\HTTP\Kennel` 
    ```php
    // App\HTTP\Kennel 
    'web' => [
    // ... other middlewares
    // add this as the last item in the `web` middlewareGroup
    \App\Http\Middleware\HandleInertiaRequests::class,
    ],
    ```

 
4. Install the Client side
    ```sh
    npm install @inertiajs/inertia @inertiajs/inertia-svelte svelte @inertiajs/progress
    ```

5. Paste the following into `resources/js/app.js`
    ```js
    require("./bootstrap");
    import { createInertiaApp } from "@inertiajs/inertia-svelte";
    import { InertiaProgress } from "@inertiajs/progress";

    InertiaProgress.init();

    createInertiaApp({
        resolve: (name) => require(`./Pages/${name}.svelte`),
        setup({ el, App, props }) {
            new App({ target: el, props });
        },
    });
    ```

6. Create an Svelte page component
    ```js
    <script>
        let name = 'world';
    </script>

    <style>
    </style>

    <h1> Hello {name}, welcome to Svelte </h1>
    <button class="btn-blue" type="submit">Submit</button>

    ```

7. Edit your `routes/web.php` file like below
    ```php

    <?php

    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;

    /** */

    Route::get('/', function () {
        return Inertia::render('Index');
    });
    ```

8. Install bundler dependencies along with TailwindCSS dependencies
    ```sh
    npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/plugin-syntax-dynamic-import @babel/core @babel/plugin-syntax-dynamic-import @babel/preset-env css-loader resolve-url-loader file-loader postcss-loader style-loader svelte-loader sass sass-loader  laravel-mix laravel-mix-svelte laravel-mix-artisan-serve laravel-mix-tailwind tailwindcss  @tailwindcss/jit postcss browser-sync browser-sync-webpack-plugin postcss-import
    ```

9. Setup your `package.json` scripts like this
    ```json
    "scripts": {
            "dev": "npm run development",
            "development": "TAILWIND_MODE=build  mix",
            "watch": "mix watch",
            "watch-poll": "mix watch -- --watch-options-poll=1000",
            "hot": "mix watch --hot",
            "start-dev": "npm run watch",
            "prod": "npm run production",
            "production": "mix --production",
            "start": "npm run dev",
            "build": "npm run prod"
        },
    ```

10. Setup TailwindCSS
    Create a scss file at `resources/css/app.scss` and add the following 
    ```scss
    // if you want to use locally hosted font files, include them at the top of the file like below
    @font-face {
        font-family: "Oduda"; // name the file to be used in the `tailwind.config.js` file
        src: url(my-font.woff) format("woff"); // url(relativePath from this `app.css` file)
    }

    // import the Tailwind Utilities
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
        h1 {
             // a sample using the custom font above in Tailwind. See the `tailwind.config.js` file
            @apply text-2xl font-display;
        }
    }

    @layer components {
        // an example of how you can reuse utilities to create style components and use them in your app. See it usage in the `resources/js/Pages/Index.svelte` above
        .btn-blue {
            @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
        }
    }

    @layer utilities {
        // create custom utilities here... the ones below are just for demo, feeel free to remove them
        @variants hover, focus {
            .filter-none {
                filter: none;
            }
            .filter-grayscale {
                filter: grayscale(100%);
            }
        }
    }
    ```

    Create the `tailwind.config.js` file by running this command
    ```sh
    npx tailwind init 

    # for a full config-file for reference to extend the utilities run the command below
    npx tailwind init  --full tw-full-config.js
    ```
    Setup the `tailwind.config.js` file like below
    ```js
    module.exports = {
        mode: "jit",
        purge: [
            "./storage/framework/views/*.php",
            "./resources/**/*.blade.php",
            "./resources/**/*.js",
            "./resources/**/*.vue",
            "./resources/**/*.svelte",
            './resources/**/*.svelte.js',
        ],
        darkMode: false, // or 'media' or 'class'
        theme: {
            extend: {},
        variants: {
            extend: {},
        },
        plugins: [],
    };
    ```

11. Setup your `webpack.mix.js` like this
    ```js
        const mix = require("laravel-mix");
        require("laravel-mix-svelte");
        require("laravel-mix-artisan-serve");

        /** */

        mix.js("resources/js/app.js", "public/js")
            .extract(["svelte"])
            .svelte({
                dev: !mix.inProduction(),
            })
            .webpackConfig({
                output: {
                    chunkFilename: "js/[name].js?id=[chunkhash]",
                },
            })
            .sass("resources/css/app.scss", "public/css/app.css")
            .options({
                postCss: [
                    require("@tailwindcss/jit"),
                    require("postcss-import"),
                ],
            })
            .browserSync('localhost:8000')
            .serve();

        // only cache version in prod
        if (mix.inProduction()) {
            mix.version();
        }

    ```

## Checkpoint
Greate Job if you have made it this far. You have successfully setup Laravel + Inertia + Svelte + Tailwind + Laravel Mix + BrowserSync.

Try it out by running and make some changes in your `resources/js/Pages/Index.svelte` file and see it reload almost instantly
```sh
    npm run start-dev
```

That's satisfactory, but that's not what we want. It takes some time for the project to build up, and we don't have any [Hot Module Replacement(HRM)](https://www.snowpack.dev/#hot-module-replacement) support here. The `browserSync` does a full page refresh and it does it fast. At least in my opinion. 

Let go on and replace Laravel Mix with Snowpack but before that, know that there are going to be trade-offs. Laravel Mix has full support for [Tailwind-JIT]() mode while [Snowpack has some compactability issues](). Snowpack also takes some time to do the initial rendering as it fetches all your assets but you can trade that of by using code-splaitting/dynamic import which will in turn give you fast initial rendering but subsequent navigation to other pages will require another fetch for that page and its assets.

If you are okay with that, let's proceed. otherwise: enjoy building your project with this awesome combo you have already.

1. Install the following dependencies
```sh
npm install snowpack svelte-hmr svelte-preprocess typescript cssnano autoprefixer @snowpack/plugin-dotenv @types/snowpack-env @tsconfig/svelte  @snowpack/plugin-typescript @snowpack/plugin-svelte postcss postcss-cli @snowpack/plugin-postcss nodemon browserify watch concurrently
```
Setup your `package.json` scripts like below
```json
  "scripts": {
        "start": "snowpack build --watch",
        "build": "snowpack build",
        "build:tailwind": "postcss ./resources/css/tailwind.css -o public/css/app.css",
        "nodemon:watch": "nodemon -x npm run build:tailwind -w tailwind.config.js -w tailwind.css",
        "watch": "watch 'npm run build:tailwind' ./resources",
        "start-dev": "concurrently  'npm run nodemon:watch' 'npm run start' ''"
    },
```

2. Create these config files at the stated locations
    * `svelte.config.js`
    ```js
    const autoPreprocess = require('svelte-preprocess');

    module.exports = {
        preprocess: autoPreprocess({
            defaults: {
                script: 'typescript',
                style: 'postcss'
            }
        })
    }
    ```
    * `postcss.config.js`
    ```js
    const tailwind = require('tailwindcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');

    const plugins = process.env.NODE_ENV === 'production' ? [tailwind, autoprefixer, cssnano] : [tailwind, autoprefixer];

    module.exports = { plugins };
    ```

    * `babelrc`
    ```js
    {
        "presets": ["@babel/preset-typescript"],
        "plugins": ["@babel/plugin-syntax-dynamic-import"]
    }
    ```

    * `tsconfig.json`
    ```json
        {
            "extends": "@tsconfig/svelte/tsconfig.json",
            "include": ["src", "types"],
            "exclude": ["node_modules"],
            "compilerOptions": {
                "module": "esnext",
                "target": "esnext",
                "moduleResolution": "node",
                "jsx": "preserve",
                "baseUrl": "./",
                /* paths - If you configure Snowpack import aliases, add them here. */
                "paths": {},
                /* noEmit - Snowpack builds (emits) files, not tsc. */
                "noEmit": true,
                /* Additional Options */
                "strict": true,
                "skipLibCheck": true,
                "types": ["snowpack-env"],
                "forceConsistentCasingInFileNames": true,
                "resolveJsonModule": true,
                "useDefineForClassFields": true,
                "allowSyntheticDefaultImports": true,
                "importsNotUsedAsValues": "error"
            }
        }
    ```
    * `snowpack.config.js`
    ```js
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

    ```


3. Edit the `resources/js/app.js` to look like below
    ```js
    //require("./bootstrap");
    import { createInertiaApp } from "@inertiajs/inertia-svelte";
    import { InertiaProgress } from "@inertiajs/progress";

        
    InertiaProgress.init()

    let el = document.getElementById('app')

    var app = new App({
    target: el,
    props: {
        initialPage: JSON.parse(el.dataset.page),
        resolveComponent: (name) => import(`./Pages/${name}.svelte.js`),
    },
    })



    // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
    // Learn more: https://www.snowpack.dev/#hot-module-replacement
    if (import.meta.hot) {
        import.meta.hot.accept();
        import.meta.hot.dispose(() => {
            app.$destroy();
        });
    }
    ```

4. Edit the `resources/views/app.blade.php` to look like below
    ```php
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            
            {{-- browserify require package output --}}
            {{-- <script src="bundle.js"></script> --}}
            <link rel="stylesheet" type="text/css" href="/css/app.css" />
        </head>

        <body>
            @inertia
            @env('local')
                <script type="text/javascript">window.HMR_WEBSOCKET_URL="ws://localhost:12321";</script>
                <script type="module" src="/_snowpack/hmr-client.js"></script>
            @endenv
            <script src="/js/app.js" type="module"></script>
        </body>
    </html>

    ```
