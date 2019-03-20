<template>
    <div id="root">
        <!-- <m-header></m-header> -->
        <router-view></router-view>
    </div>
</template>
<script>
// import Header from "./components/Header";
export default {
    components: {
        // "m-header": Header
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
