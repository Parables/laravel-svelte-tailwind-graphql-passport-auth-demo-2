const mix = require("laravel-mix");
require("laravel-mix-svelte");
require("laravel-mix-tailwind");
// require('laravel-mix-auto-extract');
require("laravel-mix-artisan-serve");
const tailwindJit = require("@tailwindcss/jit");
const glob = require("glob-all");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .extract(["svelte"])
    .tailwind()
    .svelte({
        dev: !mix.inProduction(),
    })
    .webpackConfig({
        output: {
            chunkFilename: "js/[name].js?id=[chunkhash]",
        },
    })
    .sass("resources/css/app.scss", "public/css/app.css") // for sass
    .options({
        postCss: [
            tailwindJit,
            require("css-declaration-sorter")({ order: "smacss" }), // a personal preference, can be removed
        ],
        autoprefixer: {
            // this entire object can be empty, i believe laravel mix handles has a lower version setting
            options: {
                browsers: ["last 4 versions"],
            },
        },
    })
    .serve();

// mix.browserSync({
//     host: "localhost",
//     port: 8000,
//     open: "external",
//     proxy: 'http://localhost:3100/',
//     files: glob.sync([
//         // "resources/js/**/*.{js,vue, svelte}",
//         // "resources/css/**/*.scss", "resources/css/**/*.css",
//         // "tailwind.config.js",
//     ]),
// });

mix.browserSync({
    open: false,
    files: [
      'app/**/*',
      'public/**/*',
      'resources/views/**/*',
      'routes/**/*'
    ]
  })


  /* mix.browserSync('my-domain.test');
 */

// only cache version in prod
if (mix.inProduction()) {
    mix.version();
}
