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

2. Paste the following in `resources/view/app.balde.php`
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
