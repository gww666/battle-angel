<template>
    <div>
        lalalalalalallala
        <button @click="add">加1</button>
        <span>{{count}}</span>
    </div>
</template>
<script>
// import Header from "./components/Header";
export default {
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
        add() {
            this.$store.commit("add", 1);
        }
    },
    components: {
        // "m-header": Header
    }
}
</script>

<style>
</style>
