<template>
    <div class="form-box">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: "12"
        }
    },
    methods: {
        getValues() {
            let values = {};
            this.$children.forEach(item => {
                // console.log("child-id", item.id);
                values[item.id] = item.value;
            });
            return values;
        },
        //不传值则调用清空方法
        setValues(values) {
            if (!values) return this.resetValues();
            //因为$children方法不保证顺序，所以需要进行双循环遍历
            Object.keys(values).forEach(key => {
                for (let child of this.$children) {
                    if (key === child.id) {
                        //进行赋值操作
                        child.setValue(values[key]);
                        //结束该层遍历
                        continue;
                    }
                }
            });
        },
        resetValues() {
            this.$children.forEach(item => {
                item.setValue("");
            });
        }
    },
    mounted() {
        // console.log(this.$children);
        
        
    }
}
</script>
<style lang="scss" scoped>
.form-box {

}
</style>
