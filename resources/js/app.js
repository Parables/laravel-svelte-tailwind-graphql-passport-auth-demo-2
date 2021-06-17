// import "./bootstrap";
import { App } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

let el = document.getElementById('app')

new App({
  target: document.body,
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
