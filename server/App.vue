<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    mounted() {
        import("./util/message.js");
        // import("../plugin/ps/index.js");
    }
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
