export function createPlugin({ ref }) {
    function plugin(app, ops) {
        const methods = {};
        const computed = {};

        for (let [key, func] of Object.entries(ops)) {

            // 1. add original function to methods

            const $fetch = 'asyncomp_fetch_' + key;
            methods[$fetch] = func;

            // 2. create computed property that uses original function to asynchronously fetch the value
            // and asssign it to the Vue.ref instance

            const $ref = ref(null);
            function cfetch() {
                this[$fetch]($ref);
                return $ref;
            }

            // 3. create computed propery with the original function name that uses previous computed property
            // to return Vue's ref.value

            const $cfetch = 'asyncomp_cfetch_' + key;
            computed[$cfetch] = cfetch;

            function comp() {
                return this[$cfetch].value;
            }
            computed[key] = comp;
        }
        app.mixin({ methods, computed });
    }
    return plugin
}
