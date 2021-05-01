# vue3-async-computed

This Vue 3 plugin allows you to create computed properties that are computed asynchronously.

```js
import * as Vue from 'vue';
import * as AsyncComputed from 'vue3-async-computed';

const asyncComputed = AsyncComputed.createPlugin({ ref: Vue.ref });

Vue.createApp({

    data() {
        return {
            userID: 1,
        }
    },

}).use(asyncComputed, {

    async profile(result) {
        result.value = `loading profile for user ${this.userID}...`;
        const response = await fetch(`https://httpbin.org/get?userID=${this.userID}`);
        const data = await response.json();
        result.value = data;
    },

}).mount('#app');
```

And then, in HTML:

```html
<div>{{ userID }}: {{ profile }}</div>
```

## Install

Install using `npm install vue3-async-computed`

## Examples

- Basic example, the app displays price information for any selected crypto currency: [JSFiddle](https://jsfiddle.net/andriika/otagfzjL/)

## Todo
Describe how to approach manual re-calculation of the async computed properties. Provide an example.
