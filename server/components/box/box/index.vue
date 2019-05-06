<template>
    <div class="com-box">
        <component 
            v-for="(item, index) in componentList" 
            :is="item.type" :key="index + '' + item.type"
            :componentId="item.id"
            :data-baid="item.id"
            :data-bagroup="item.group">
        </component>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        componentsList() {
            return []
        }
    }
}
</script>
<style lang="scss" scoped>
.com-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}
</style>


