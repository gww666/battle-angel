<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>
<script>
import PrivateInit from "./private.init";
export default {
    mixins: [PrivateInit]
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .clear {
        clear: both;
    }
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    html, body, #root {
        height: 100%;
        width: 100%;
    }
</style>
