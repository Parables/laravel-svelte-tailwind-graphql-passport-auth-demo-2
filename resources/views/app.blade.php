<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
    <script src="{{ mix('/js/app.js') }}" defer></script>
</head>

<body>
    @inertia


    @if (getenv('APP_ENV') === 'local')
        <script id="__bs_script__">
            const src = `http://${location.hostname}:3000/browser-sync/browser-sync-client.js?v=2.26.14`;
            const scpt = `<script async src=${src} ><\/script>`
            document.write(scpt)
        </script>
    @endif
</body>

</html>
