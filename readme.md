# vue3-async-computed

This Vue 3 plugin allows you to create computed properties that are computed asynchronously.

```js
import asyncomputed from 'vue3-async-computed';

Vue.createApp({

    data() {
        return {
            userID: 1,
        }
    },

}).use(asyncomputed, {

    async profile() {
        const url = `https://httpbin.org/get?userID=${this.userID}`;
        return fetch(url).then(r => r.json());
    },

}).mount('#app');
```
And then, in html template:
```html
<div>{{ userID }}: {{ profile }}</div>
```

## Install

Install using `npm install vue3-async-computed`
