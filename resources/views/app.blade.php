<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        {{-- browserify require package output --}}
        {{-- <script src="js/bundle.js"></script> --}}
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
