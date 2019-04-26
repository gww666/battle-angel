<template>
	<div class="input4-box" :style="{...boxStyle}">
        <input type="text" 
            :style="{...inputStyle}"
            :placeholder="placeholder" v-model="value" />
        <img 
            @click="clear" 
            class="clear" 
            src="../../../public/static/images/close2.png" />
    </div>
</template>
<script>
import Base from "../base";
export default {
	mixins: [Base],
	data() {
		return {
            value: "",
            width: "",
            position: "",
            left: "",
            top: "",
            transform: "",
            backgroundColor: "",
            borderRadius: ""
		}
    },
    computed: {
        boxStyle() {
            return {
                width: this.width,
                position: this.position,
                left: this.left,
                top :this.top,
                transform: this.transform,
                height: this.height,
                // backgroundColor: this.backgroundColor,
                // borderRadius: this.borderRadius
            }
        },
        inputStyle() {
            return {
                backgroundColor: this.backgroundColor,
                borderRadius: this.borderRadius
            }
        }
    },
	methods: {
		//赋值操作
		setValue(value) {
			this.value = value;
        },
        //清除事件
        clear() {
            this.value = "";
        }
	}
};
</script>
<style lang="scss" scoped>
.input4-box {
    width: 6.25rem;
    height: 0.8rem;
    position: relative;
    
    input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // background-color: rgba(0, 0, 0, 0);
        outline: none;
        border: 1px solid #fff;
        text-align: center;
        color: #fff;
        background-color: #f1f1f1f1;
        border-radius: 0.2rem;
    }
    .clear {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.3rem;
        width: 0.3rem;
        height: 0.3rem;
    }
}
</style>

