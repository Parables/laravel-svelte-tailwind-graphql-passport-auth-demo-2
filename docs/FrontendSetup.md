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
    npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader css-loader resolve-url-loader file-loader postcss-loader style-loader svelte-loader sass sass-loader  laravel-mix laravel-mix-svelte laravel-mix-artisan-serve laravel-mix-tailwind tailwindcss  @tailwindcss/jit postcss browser-sync browser-sync-webpack-plugin postcss-import
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

That's satisfactory, but that's not what we want. It takes some time for the project to build up, and we don't have any `Hot Module Replacement(HRM)` support here. The `browserSync` does a full page refresh and it does it fast. At least in my opinion. 

Let go on and replace Laravel Mix with Snowpack but before that, know that there are going to be trade-offs. Laravel Mix has full support for [Tailwind-JIT]() mode while [Snowpack has some compactability issues]()

