export default function asyncomputed(app, ops) {

    const methods = {};
    const computed = {};

    for (const func of Object.values(ops)) {

        // 1. add original function to methods

        const $fetch = '$asyncomp_fetch_' + func.name;
        methods[$fetch] = func;

        // 2. create computed property that uses original function to asynchronously fetch the value
        // and asssign it to the Vue.ref instance

        const ref = Vue.ref(null);
        function cfetch() {
            this[$fetch]().then(r => { ref.value = r; });
            return ref;
        }

        // 3. create computed propery with the original function name that uses previous computed property
        // to return Vue's ref.value

        const $cfetch = '$asyncomp_cfetch_' + func.name;
        computed[$cfetch] = cfetch;

        function comp() {
            return this[$cfetch].value;
        }
        computed[func.name] = comp;
    }

    app.mixin({ methods, computed });
}